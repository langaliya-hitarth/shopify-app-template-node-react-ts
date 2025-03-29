import cron from 'node-cron';
import cleanupCommand from '../commands/cleanup.command.js';
const scheduler = () => {
  // Run every day at 00:00
  cron.schedule('0 0 * * *', () => {
    cleanupCommand();
  });
};

export default scheduler;
