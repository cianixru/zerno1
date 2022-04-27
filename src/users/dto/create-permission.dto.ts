import {
  IsInt,
  IsPositive,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsObject,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PermissionAction } from '../../types';

export class CreatePermissionDto {
  @ApiProperty()
  @IsEnum(PermissionAction)
  @IsNotEmpty()
  public action: PermissionAction;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  public objId: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  public condition: object;
}
