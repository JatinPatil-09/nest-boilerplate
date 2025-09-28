import { registerAs } from '@nestjs/config';

export interface DatabaseConfigType {
  readonly url: string;
}

export const databaseConfig = registerAs('database', (): DatabaseConfigType => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  return {
    url,
  };
});
