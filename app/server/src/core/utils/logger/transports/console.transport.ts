import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import { LogLevel } from '@prisma/client';
import { isInvalid } from '@utils/validation.utils.js';

class ConsoleTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'debug';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const logLevel = info.level as LogLevel;

    if (logLevel === 'error' || logLevel === 'fatal') {
      console.error(info.message);
    } else if (logLevel === 'warn') {
      console.warn(info.message);
    } else if (logLevel === 'info') {
      console.info(info.message);
    } else {
      console.log(info.message);
    }

    if (!isInvalid(info.metadata)) {
      console.table(info.metadata);
    }

    callback();
  }
}

export default ConsoleTransport;
