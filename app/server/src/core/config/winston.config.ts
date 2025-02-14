import type { WinstonConfig } from '../types/logger.types.js';

const winstonConfig: WinstonConfig = {
  level: {
    cli: process.env.NODE_ENV === 'development' ? 'debug' : process.env.CLI_LOG_LEVEL || 'info',
    prisma: process.env.PRISMA_LOG_LEVEL || 'error',
    rollbar: process.env.ROLLBAR_LOG_LEVEL || 'info',
  },
  levels: {
    fatal: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
  },
};

export default winstonConfig;
