import { createLogger, format, transports } from 'winston';
import PrismaTransport from './transports/prisma.transport.js';
import winstonConfig from '../config/winston.config.js';
import { isInvalid } from '../utils/validation.utils.js';

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
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.printf(info => {
          return `[${info.timestamp} / ${info.level}] ${info.message} ${!isInvalid(info.metadata) ? `\n${JSON.stringify(info.metadata)}` : ''}`;
        }),
      ),
    }),

    new PrismaTransport({
      level: winstonConfig.level.cli,
      format: format.combine(format.json()),
    }),
  ],
});

export default logger;
