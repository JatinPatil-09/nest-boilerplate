/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient, Prisma } from '@prisma/client';

let prisma: PrismaClient | undefined;

/**
 * Get Prisma client instance
 * Creates a singleton instance for production use
 */
export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    const logLevels: Prisma.LogLevel[] =
      process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'];

    prisma = new PrismaClient({
      log: logLevels,
    });
  }
  return prisma;
};

/**
 * Connect to database
 */
export const connectDatabase = async (): Promise<void> => {
  const client = getPrismaClient();
  await client.$connect();
};

/**
 * Disconnect from database
 */
export const disconnectDatabase = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
  }
};

/**
 * Execute database operations with transaction
 */
export const withTransaction = async <T>(
  operation: (client: PrismaClient) => Promise<T>,
): Promise<T> => {
  const client = getPrismaClient();
  return client.$transaction(async (tx) => {
    return operation(tx as PrismaClient);
  });
};

/**
 * Health check for database connection
 */
export const isDatabaseConnected = async (): Promise<boolean> => {
  try {
    const client = getPrismaClient();

    await client.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
};
