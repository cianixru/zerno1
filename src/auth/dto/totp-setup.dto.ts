import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator';

export class TotpSetupDto {
  @ApiProperty({ example: '+79000000000' })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('ru-RU')
  phoneNumber: string;
}
