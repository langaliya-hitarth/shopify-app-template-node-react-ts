import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import { LogLevel, Prisma } from '@prisma/client';
import { createLog } from '@repositories/log.repository.js';
import { isInvalid } from '@utils/validation.utils.js';

class PrismaTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'error';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    let stack = null;

    if (!isInvalid(info.stack)) {
      stack = info.stack;
      delete info.stack;
    }

    createLog({
      level: info.level as LogLevel,
      message: info.message,
      timestamp: new Date(info.timestamp || Date.now()),
      metadata: isInvalid(info.metadata) ? Prisma.DbNull : info.metadata,
      stack,
    });

    callback();
  }
}

export default PrismaTransport;
