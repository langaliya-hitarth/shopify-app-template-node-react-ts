import logger from '../core/logger/logger.js';
import { deleteOldLogs } from '../repositories/log.repository.js';

const logsCommand = async () => {
  logger.debug('Deleting old logs');
  await deleteOldLogs();
  logger.debug('Old logs deleted');
};

export default logsCommand;
