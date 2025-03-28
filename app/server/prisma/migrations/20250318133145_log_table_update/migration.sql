/*
  Warnings:

  - You are about to alter the column `metadata` on the `log` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `log` ADD COLUMN `stack` LONGTEXT NULL,
    MODIFY `metadata` JSON NULL;
