import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSmsService } from './auth-sms.service';
import { AuthTotpService } from './auth-totp.service';
import { UserRepository } from '../users/repositories';
import { TotpSetupDto } from './dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authSmsService: AuthSmsService,
    private userRepository: UserRepository,
    private configService: ConfigService,
    private authTotpService: AuthTotpService,
  ) {}

  private isProduction(): boolean {
    return this.configService.get<string>('server.nodeEnv') === 'production';
  }

  async totpSetup(totpSetupDto: TotpSetupDto) {
    const { secret, smsCode } = this.authTotpService.generate();
    const { phoneNumber } = totpSetupDto;
    await this.userRepository.saveTotpSecret(phoneNumber, secret);
    if (this.isProduction()) {
      const message = `Код подтверждения: ${smsCode}`;
      this.authSmsService.send(phoneNumber, message);
    }
  }

  // async validateUser(phoneNumber: string, smsCode: string): Promise<any> {
  async validateUser(req): Promise<any> {
    const {
      body: { phoneNumber, smsCode },
    } = req;
    const user = await this.usersService.findOneByPhoneNumber(phoneNumber);
    if (
      user &&
      user.secret &&
      this.authTotpService.check(smsCode, user.secret)
    ) {
      this.usersService.clearTotpSecret(phoneNumber);
      const { secret, ...result } = user;
      req.user = user;
      return user;
    }
    return null;
  }

  async refreshTokenValidate(refreshToken: string) {
    const res = this.jwtService.decode(refreshToken) as any;
    const user = await this.userRepository.findOne({
      where: { phoneNumber: res.phoneNumber, refreshToken },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const { phoneNumber, id: sub } = user;
    const payload = { phoneNumber, sub };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = sign(payload, 'secret', { expiresIn: '72h' });
    //TODO: secret и exp в config
    await this.userRepository.saveRefreshToken(phoneNumber, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshTokenDto) {
    //TODO: разобраться как в custom-strategy извлечь user и
    // убрать повторный запрос user
    const res = this.jwtService.decode(refreshTokenDto.refreshToken) as any;
    const user = await this.userRepository.findOne({
      where: {
        phoneNumber: res.phoneNumber,
        refreshToken: refreshTokenDto.refreshToken,
      },
    });
    const payload = { phoneNumber: res.phoneNumber, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = sign(payload, 'secret', { expiresIn: '72h' });
    //TODO: secret и exp в config
    await this.userRepository.saveRefreshToken(res.phoneNumber, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
}
