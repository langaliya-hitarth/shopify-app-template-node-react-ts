import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import { prisma } from '../../config/prisma.config.js';
import { LogLevel } from '@prisma/client';

class PrismaTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'error';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    try {
      await prisma.log.create({
        data: {
          level: info.level as LogLevel,
          message: info.message,
          timestamp: new Date(info.timestamp || Date.now()),
          metadata: info.metadata ? JSON.stringify(info.metadata) : '',
        },
      });
    } catch (error) {
      console.error('Error saving log to database:', error);
    }

    callback();
  }
}

export default PrismaTransport;
