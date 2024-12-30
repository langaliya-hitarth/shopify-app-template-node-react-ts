-- AlterTable
ALTER TABLE `log` MODIFY `level` ENUM('info', 'warn', 'debug', 'error', 'fatal') NOT NULL DEFAULT 'info';
