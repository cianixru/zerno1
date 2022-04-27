import {
  IsString,
  IsInt,
  IsPositive,
  IsNumberString,
  IsEnum,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateEdmOperatorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public edmId: string;
}
