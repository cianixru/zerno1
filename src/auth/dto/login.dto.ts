import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator';
import { ConfigService } from '@nestjs/config';

export class LoginDto {
  constructor(private configService: ConfigService) {}

  @ApiProperty({ example: '+79000000000' })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('ru-RU') //TODO: в config
  public phoneNumber: string;

  @ApiProperty({ example: '000000' })
  @IsString()
  @IsNotEmpty()
  public smsCode: string;
}
