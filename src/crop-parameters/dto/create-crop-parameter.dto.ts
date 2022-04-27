import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropParameterDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  public cropId: number;

  @ApiProperty({ example: 'параметр' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'значение' })
  @IsString()
  @IsNotEmpty()
  public value: string;
}
