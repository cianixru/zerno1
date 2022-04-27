import { PartialType } from '@nestjs/swagger';
import { CreateBankDetailsDto } from '.';

export class UpdateBankDetailsDto extends PartialType(CreateBankDetailsDto) {}
