/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import type { AppConfigType } from '../config/app.config';
import type { DatabaseConfigType } from '../config/database.config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly configService: ConfigService) {
    const appConfig = configService.getOrThrow<AppConfigType>('app');
    const databaseConfig =
      configService.getOrThrow<DatabaseConfigType>('database');

    const isDevelopment = appConfig.nodeEnv === 'development';

    super({
      datasources: {
        db: {
          url: databaseConfig.url,
        },
      },
      log: isDevelopment ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error('Failed to connect to database', message);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from database');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error('Error during database disconnection', message);
    }
  }
}
