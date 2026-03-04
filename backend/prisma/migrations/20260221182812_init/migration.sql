-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `allow_notifications` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `document_id` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `wallet_type` VARCHAR(191) NULL,
    `profession_id` INTEGER NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deduction` (
    `deduction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `deduction_name` VARCHAR(191) NOT NULL,
    `max_limit` DOUBLE NOT NULL,
    `tax_year_applies` INTEGER NOT NULL,

    PRIMARY KEY (`deduction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDeduction` (
    `user_deduction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `deduction_id` INTEGER NOT NULL,
    `tax_year` INTEGER NOT NULL,
    `amount_claimed` DOUBLE NOT NULL,
    `transaction_id` INTEGER NULL,

    PRIMARY KEY (`user_deduction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxRecord` (
    `tax_record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tax_year` INTEGER NOT NULL,
    `total_business_income` DOUBLE NOT NULL,
    `total_deductions_claimed` DOUBLE NOT NULL,
    `net_income` DOUBLE NOT NULL,
    `tax_due` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tax_record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`document_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDeduction` ADD CONSTRAINT `UserDeduction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDeduction` ADD CONSTRAINT `UserDeduction_deduction_id_fkey` FOREIGN KEY (`deduction_id`) REFERENCES `Deduction`(`deduction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxRecord` ADD CONSTRAINT `TaxRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
