import type { Session } from '@prisma/client';
import { prisma } from '@config/prisma.config.js';

export const findSessionByShop = async (shop: string): Promise<Session> => {
  return await prisma.session.findFirstOrThrow({
    where: {
      shop: { equals: shop },
    },
  });
};

const sessionRepository = {
  findSessionByShop,
};

export default sessionRepository;
