import { PrismaClient } from '@prisma/client';
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma';

export const prisma = new PrismaClient();
export const prismaSessionStorage = new PrismaSessionStorage(prisma);

const prismaConfig = { prisma, prismaSessionStorage };

export default prismaConfig;
