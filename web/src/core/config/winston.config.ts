import type { WinstonConfig } from '../logger/index.js';

const winstonConfig: WinstonConfig = {
  level: {
    cli: process.env.CLI_LOG_LEVEL || 'info',
    prisma: process.env.PRISMA_LOG_LEVEL || 'error',
  },
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  emojis: {
    fatal: ':boom:',
    error: ':x:',
    warn: ':warning:',
    info: ':thought_balloon:',
    debug: ':beetle:',
  },
};

export default winstonConfig;
