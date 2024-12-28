-- CreateTable
CREATE TABLE `log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `level` ENUM('info', 'warn', 'debug', 'error') NOT NULL DEFAULT 'info',
    `message` LONGTEXT NOT NULL,
    `metadata` LONGTEXT NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
