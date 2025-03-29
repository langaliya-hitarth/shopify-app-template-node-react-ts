import { createLogger, format } from 'winston';
import PrismaTransport from '@utils/logger/transports/prisma.transport.js';
import winstonConfig from '@config/winston.config.js';
import ShopifyConsoleTransport from '@utils/logger/transports/shopifyConsole.transport.js';
import RollbarTransport from '@utils/logger/transports/rollbar.transport.js';
import ConsoleTransport from '@utils/logger/transports/console.transport.js';

const logger = createLogger({
  level: winstonConfig.level.cli,
  levels: winstonConfig.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS',
    }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  ),
  transports: [
    new ShopifyConsoleTransport({
      level: winstonConfig.level.cli,
    }),

    new PrismaTransport({
      level: winstonConfig.level.prisma,
      format: format.combine(format.json()),
    }),

    new RollbarTransport({
      level: winstonConfig.level.rollbar,
    }),

    new ConsoleTransport({
      level: winstonConfig.level.cli,
    }),
  ],
});

export default logger;
