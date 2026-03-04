/*
  Warnings:

  - You are about to drop the column `income_channel` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `income_channel`;

-- CreateTable
CREATE TABLE `IncomeChannel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `channel` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IncomeChannel` ADD CONSTRAINT `IncomeChannel_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
