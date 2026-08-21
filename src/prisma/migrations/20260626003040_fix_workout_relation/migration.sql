/*
  Warnings:

  - You are about to drop the column `title` on the `workout` table. All the data in the column will be lost.
  - Added the required column `description` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workout` DROP COLUMN `title`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
