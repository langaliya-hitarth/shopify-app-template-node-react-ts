import { PrismaClient } from '@prisma/client';
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma';

// Prisma client
export const prisma = new PrismaClient();

// Prisma session storage
export const prismaSessionStorage = new PrismaSessionStorage(prisma);

// Prisma config
const prismaConfig = { prisma, prismaSessionStorage };

export default prismaConfig;
