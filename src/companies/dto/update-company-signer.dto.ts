import { PartialType } from '@nestjs/swagger';
import { CreateCompanySignerDto } from '.';

export class UpdateCompanySignerDto extends PartialType(
  CreateCompanySignerDto,
) {}
