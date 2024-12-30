import type { LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import type { TransportStreamOptions } from 'winston-transport';
import rollbarConfig from '../../config/rollbar.config.js';
import type { Level } from 'rollbar';

class RollbarTransport extends TransportStream {
  constructor(options: TransportStreamOptions) {
    super(options);
    this.level = options.level || 'error';
  }

  async log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const payload = info.metadata || {};
    rollbarConfig.configure({ logLevel: info.level as Level, payload });
    rollbarConfig.log(info.message);
    callback();
  }
}

export default RollbarTransport;
