import { Controller, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { TotpSetupDto, LoginDto, RefreshTokenDto } from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TotpAuthGuard } from './totp-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenGuard } from './refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('setup')
  totpSetup(@Body() totpSetupDto: TotpSetupDto) {
    return this.authService.totpSetup(totpSetupDto);
  }

  @UseGuards(TotpAuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RefreshTokenGuard)
  @Patch('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }
}
