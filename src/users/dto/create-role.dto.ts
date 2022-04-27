import {
  IsInt,
  IsPositive,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PermissionAction } from '../../types';
import { Roles } from '../../types';

export class CreateRoleDto {
  @ApiProperty({ example: Roles.USER })
  @IsEnum(Roles)
  @IsNotEmpty()
  public name: Roles;
}
