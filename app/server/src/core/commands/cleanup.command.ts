import logger from '@utils/logger/logger.utils.js';
import { deleteOldLogs } from '@repositories/log.repository.js';

const cleanupCommand = async () => {
  logger.debug('Deleting old logs (30 days)');
  await deleteOldLogs(30);
  logger.debug('Old logs deleted');
};

export default cleanupCommand;
