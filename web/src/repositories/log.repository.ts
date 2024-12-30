import type { Prisma } from '@prisma/client';
import { prisma } from '../core/config/prisma.config.js';

export const createLog = async <T extends Prisma.LogCreateInput>(data: T): Promise<void> => {
  await prisma.log.create({
    data,
  });
};

const logRepository = {
  createLog,
};

export default logRepository;
