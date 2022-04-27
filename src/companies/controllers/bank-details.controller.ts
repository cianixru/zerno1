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
import { BankDetailsService } from '../services';
import { CreateBankDetailsDto, UpdateBankDetailsDto } from '../dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) {}
  @Get(':companyId/bank-details')
  findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.bankDetailsService.findAllByCompanyId(+companyId);
  }

  @Get('bank-details/:bankDetailsId')
  findOne(@Param('bankDetailsId') bankDetailsId: string) {
    return this.bankDetailsService.findOne(+bankDetailsId);
  }

  @Post(':companyId/bank-details')
  create(
    @Param('companyId') companyId: string,
    @Body() createBankDetailsDto: CreateBankDetailsDto,
  ) {
    return this.bankDetailsService.create(+companyId, createBankDetailsDto);
  }

  @Patch('bank-details/:bankDetailsId')
  update(
    @Param('bankDetailsId') bankDetailsId: string,
    @Body() updateBankDetailsDto: UpdateBankDetailsDto,
  ) {
    return this.bankDetailsService.update(+bankDetailsId, updateBankDetailsDto);
  }

  @Delete('bank-details/:bankDetailsId')
  remove(@Param('bankDetailsId') bankDetailsId: string) {
    return this.bankDetailsService.remove(+bankDetailsId);
  }
}
