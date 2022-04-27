import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddPermissionToRoleDto {
  @ApiProperty({ example: [1] })
  @IsArray()
  // @ValidateNested({ each: true })
  @ArrayMinSize(1)
  // @Type(() => Number)
  public permissionIds: number[];
}
