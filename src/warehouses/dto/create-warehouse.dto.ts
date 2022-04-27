import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'Склад' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'Москва' })
  @IsString()
  @IsOptional()
  public address: string | null;

  @ApiProperty({ example: 'https://map.example.com/warehouse' })
  @IsString()
  @IsOptional()
  public map: string | null;
}
