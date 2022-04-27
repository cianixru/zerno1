import { PartialType } from '@nestjs/swagger';
import { CreateEdmOperatorDto } from '.';

export class UpdateEdmOperatorDto extends PartialType(CreateEdmOperatorDto) {}
