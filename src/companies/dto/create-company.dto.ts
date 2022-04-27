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

enum CompanyType {
  GROWER = 'grower',
  BUYER = 'buyer',
  TRADER = 'trader',
  CARRIER = 'carrier',
}

export class CreateCompanyDto {
  @ApiProperty({ example: CompanyType.GROWER })
  @IsNotEmpty()
  @IsEnum(CompanyType)
  public roleTypeId: CompanyType;

  @ApiProperty({ example: 'Some company' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNumberString()
  public inn: string | null;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNumberString()
  public kpp: string | null;

  @ApiProperty({ example: '62.11' })
  @IsString()
  public okved: string | null;

  @ApiProperty({ example: ['62.12', '63.12'] })
  @IsArray()
  @IsOptional()
  public okveds: string[] | null;

  @ApiProperty({ example: 'Some address' })
  @IsString()
  @IsNotEmpty()
  public address: string | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  public nds: boolean;
}
