import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  port: process.env.REST_PORT || 3000,
  nodeEnv: process.env.NODE_ENV,
}));
