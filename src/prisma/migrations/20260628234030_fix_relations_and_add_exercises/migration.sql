/*
  Warnings:

  - You are about to drop the column `durationSec` on the `exercise` table. All the data in the column will be lost.
  - Added the required column `reps` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `exercise` DROP FOREIGN KEY `Exercise_workoutId_fkey`;

-- AlterTable
ALTER TABLE `exercise` DROP COLUMN `durationSec`,
    ADD COLUMN `reps` INTEGER NOT NULL,
    ADD COLUMN `sets` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
