import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthSmsService } from './auth-sms.service';
import { AuthTotpService } from './auth-totp.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TotpCustomStrategy } from './totp-custom.strategy';
import { RefreshTokenCustomStrategy } from './refresh-token-custom.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../users/repositories';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '../config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' }, //TODO: вынести в config
    }),
  ],
  providers: [
    AuthService,
    AuthSmsService,
    AuthTotpService,
    TotpCustomStrategy,
    JwtStrategy,
    RefreshTokenCustomStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
