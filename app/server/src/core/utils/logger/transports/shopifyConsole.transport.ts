import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import { LogLevel } from '@prisma/client';
import { shopify } from '@config/shopify.config.js';
import { LogSeverity } from '@shopify/shopify-api';

class ShopifyConsoleTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'debug';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    let severity: LogSeverity = 2;
    const logLevel = info.level as LogLevel;

    if (logLevel === 'error' || logLevel === 'fatal') {
      severity = 0;
    } else if (logLevel === 'warn') {
      severity = 1;
    } else if (logLevel === 'debug') {
      severity = 3;
    } else {
      severity = 2;
    }

    shopify.config.logger.log(severity, info.message, info.metadata);

    callback();
  }
}

export default ShopifyConsoleTransport;
