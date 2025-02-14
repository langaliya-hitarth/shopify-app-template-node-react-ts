import { createLogger, format } from 'winston';
import PrismaTransport from './transports/prisma.transport.js';
import winstonConfig from '../config/winston.config.js';
import ConsoleTransport from './transports/console.transport.js';

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
    new ConsoleTransport({
      level: winstonConfig.level.cli,
    }),

    new PrismaTransport({
      level: winstonConfig.level.prisma,
      format: format.combine(format.json()),
    }),
  ],
});

export default logger;
