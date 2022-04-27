import {
  IsString,
  IsInt,
  IsPositive,
  IsNumberString,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  public paymentAccount: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  public correspondentAccount: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  public bic: string;
}
