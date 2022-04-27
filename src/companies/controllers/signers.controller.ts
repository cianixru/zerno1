import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SignersService } from '../services';
import { CreateCompanySignerDto, UpdateCompanySignerDto } from '../dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class SignersController {
  constructor(private readonly signersService: SignersService) {}
  @Get(':companyId/signers')
  findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.signersService.findAllByCompanyId(+companyId);
  }

  @Get('signers/:signerId')
  findOne(@Param('signerId') signerId: string) {
    return this.signersService.findOne(+signerId);
  }

  @Post(':companyId/signers')
  create(
    @Param('companyId') companyId: string,
    @Body() createCompanySignerDto: CreateCompanySignerDto,
  ) {
    return this.signersService.create(+companyId, createCompanySignerDto);
  }

  @Patch('signers/:signerId')
  update(
    @Param('signerId') signerId: string,
    @Body() updateCompanySignerDto: UpdateCompanySignerDto,
  ) {
    return this.signersService.update(+signerId, updateCompanySignerDto);
  }

  @Delete('signers/:signerId')
  remove(@Param('signerId') signerId: string) {
    return this.signersService.remove(+signerId);
  }
}
