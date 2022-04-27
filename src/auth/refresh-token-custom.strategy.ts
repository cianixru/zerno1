import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenCustomStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private authService: AuthService) {
    super();
  }

  validate({ body }) {
    return this.authService.refreshTokenValidate(body.refreshToken);
  }
}
