import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from '.';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
