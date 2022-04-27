import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ConfigService } from '@nestjs/config';

export class RefreshTokenDto {
  constructor(private configService: ConfigService) {}

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public refreshToken: string;
}
