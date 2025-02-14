import type { Prisma } from '@prisma/client';
import { prisma } from '../core/config/prisma.config.js';

export const createLog = async <T extends Prisma.LogCreateInput>(data: T): Promise<void> => {
  await prisma.log.create({
    data,
  });
};

export const deleteOldLogs = async (): Promise<void> => {
  await prisma.log.deleteMany({
    where: {
      timestamp: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      },
    },
  });
};

const logRepository = {
  createLog,
  deleteOldLogs,
};

export default logRepository;
