import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '+79000000000' })
  @IsString()
  @IsNotEmpty()
  public phoneNumber: string;

  @ApiProperty({ example: 'Ivan' })
  @IsString()
  @IsOptional()
  public name: string | null;

  @ApiProperty({ example: 'Ivanovich' })
  @IsString()
  @IsOptional()
  public patronymic: string | null;

  @ApiProperty({ example: 'Ivanov' })
  @IsString()
  @IsOptional()
  public surname: string | null;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsOptional()
  public email: string | null;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  public companyId: number | null;
}
