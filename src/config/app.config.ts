import { registerAs } from '@nestjs/config';

export interface AppConfigType {
  readonly port: number;
  readonly nodeEnv: 'development' | 'production' | 'test';
}

export const appConfig = registerAs('app', (): AppConfigType => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const nodeEnv =
    (process.env.NODE_ENV as AppConfigType['nodeEnv']) ?? 'development';

  return {
    port,
    nodeEnv,
  };
});
