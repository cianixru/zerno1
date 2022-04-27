import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  smsCodeLength: +process.env.SMS_CODE_LENGTH,
  smsCodeExpire: +process.env.SMS_CODE_EXPIRE,
  smsRuApiId: process.env.SMS_RU_API_ID,
}));
