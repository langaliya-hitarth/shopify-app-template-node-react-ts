import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import { LogLevel } from '@prisma/client';
import { createLog } from '../../../repositories/log.repository.js';

class PrismaTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'error';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    createLog({
      level: info.level as LogLevel,
      message: info.message,
      timestamp: new Date(info.timestamp || Date.now()),
      metadata: info.metadata ? JSON.stringify(info.metadata) : '',
    });

    callback();
  }
}

export default PrismaTransport;
