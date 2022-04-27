import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Headers,
  Response,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ApiFile } from '../decorators';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ParseAvatar } from '../pipes';
import { imageFileFilter, editFileName } from '../utils';
import { AppAbility, CaslAbilityFactory } from '../authz/casl-ability.factory';
import { PermissionAction } from '../types';
import { User } from './entities';

function generateFilename(file) {
  return `${Date.now()}.${extname(file.originalname)}`;
}

const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('permissions')
  getPermissions(@Request() req) {
    return this.usersService.findAllPermissionsOfUser(req.user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = new User();
    const ability = await this.abilityFactory.createForUser(req.user);
    user.id = +id;
    user.name = null;
    const allowed = ability.can(PermissionAction.READ, user);
    if (!allowed) {
      throw new ForbiddenException('You dont have access to this resource!');
    }

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const user = new User();
    const ability = await this.abilityFactory.createForUser(req.user);
    user.id = +id;
    user.name = null;
    const allowed = ability.can(PermissionAction.UPDATE, user);
    if (!allowed) {
      throw new ForbiddenException('You dont have access to this resource!');
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const user = new User();
    const ability = await this.abilityFactory.createForUser(req.user);
    user.id = +id;
    user.name = null;
    const allowed = ability.can(PermissionAction.DELETE, user);
    if (!allowed) {
      throw new ForbiddenException('You dont have access to this resource!');
    }
    return this.usersService.remove(+id);
  }

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string, @Response() response) {
    const avatar = await this.usersService.getAvatar(+userId);
    return response.sendFile(avatar, { root: './files' });
  }

  @Post('avatar/save')
  @ApiFile('avatar', true)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  saveAvatar(
    @Request() req,
    @Headers() headers,
    @UploadedFile(ParseAvatar) avatar: Express.Multer.File,
  ) {
    const apiToken = headers.authorization.split('Bearer ')[1];
    return this.usersService.saveAvatar(avatar, apiToken);
  }

  @Delete('/avatar/delete')
  deleteAvatar(@Request() req, @Headers() headers) {
    const apiToken = headers.authorization.split('Bearer ')[1];
    return this.usersService.deleteAvatar(apiToken);
  }
}
