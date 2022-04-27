import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty({ example: 'Пшеница 3 класса' })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
