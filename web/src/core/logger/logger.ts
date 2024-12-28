import { createLogger, format, transports } from 'winston';
import PrismaTransport from './transports/prisma.transport.js';
import { emojify } from 'node-emoji';
import { LogLevel } from '@prisma/client';
import winstonConfig from '../config/winston.config.js';

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
          const level = emojify(
            winstonConfig.emojis[info.level || 'info'] || winstonConfig.emojis.info,
          );
          return `[${info.timestamp} / ${level}] ${info.message}`;
        }),
      ),
    }),

    new PrismaTransport({
      level: LogLevel.error,
      format: format.combine(format.json()),
    }),
  ],
});

export default logger;
