import { PrismaClient } from '@prisma/client';
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma';

const prisma = new PrismaClient();
const prismaSessionStorage = new PrismaSessionStorage(prisma);

export { prisma, prismaSessionStorage };
