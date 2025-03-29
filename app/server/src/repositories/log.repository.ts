import type { Prisma } from '@prisma/client';
import { prisma } from '@config/prisma.config.js';

export const createLog = async (data: Prisma.LogCreateInput): Promise<void> => {
  await prisma.log.create({
    data,
  });
};

export const deleteOldLogs = async (days: number = 30): Promise<void> => {
  await prisma.log.deleteMany({
    where: {
      timestamp: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * days),
      },
    },
  });
};

const logRepository = {
  createLog,
  deleteOldLogs,
};

export default logRepository;
