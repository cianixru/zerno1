import { PartialType } from '@nestjs/swagger';
import { CreateCropParameterDto } from './create-crop-parameter.dto';

export class UpdateCropParameterDto extends PartialType(
  CreateCropParameterDto,
) {}
