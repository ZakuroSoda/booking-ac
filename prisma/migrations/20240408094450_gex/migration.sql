/*
  Warnings:

  - Added the required column `bookedBy` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `bookedBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_bookedBy_fkey` FOREIGN KEY (`bookedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
