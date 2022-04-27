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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesService } from './roles.service';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateRoleDto, UpdateRoleDto, AddPermissionToRoleDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':roleId/permissions')
  addPermissionsToRole(
    @Param('roleId') roleId: string,
    @Body() addPermissionsToRoleDto: AddPermissionToRoleDto,
  ) {
    return this.rolesService.addPermissionsToRole(
      +roleId,
      addPermissionsToRoleDto,
    );
  }

  @Delete(':roleId/permissions/:permissionId')
  deletePermissionFromRole(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.rolesService.deletePermissionFromRole(+roleId, +permissionId);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
