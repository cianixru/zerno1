import { Injectable } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { ConfigService } from '@nestjs/config';

type TotpData = {
  secret: string;
  smsCode: string;
};

@Injectable()
export class AuthTotpService {
  constructor(private configService: ConfigService) {
    totp.options = {
      step: this.configService.get<number>('auth.smsCodeExpire'),
      digits: this.configService.get<number>('auth.smsCodeLength'),
    };
  }
  private isProduction(): boolean {
    return this.configService.get<string>('server.nodeEnv') === 'production';
  }
  public generate(): TotpData {
    let secret;
    let smsCode;
    if (this.isProduction()) {
      secret = authenticator.generateSecret();
      smsCode = totp.generate(secret);
    }
    const codeLength = this.configService.get<number>('auth.smsCodeLength');
    smsCode = new Array(codeLength + 1).join('0');
    secret = smsCode;
    return { secret, smsCode };
  }

  public check(code, secret) {
    if (this.isProduction()) {
      return totp.check(code, secret);
    }
    return code === secret;
  }
}
