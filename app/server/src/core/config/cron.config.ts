import cron from 'node-cron';
import logsCommand from '../../commands/logs.command.js';

const scheduler = () => {
  // Run every day at 00:00
  cron.schedule('0 0 * * *', () => {
    logsCommand();
  });
};

export default scheduler;
