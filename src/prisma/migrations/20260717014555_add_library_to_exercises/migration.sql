-- AlterTable
ALTER TABLE `exercise` ADD COLUMN `libraryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `ExerciseLibrary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `muscleGroup` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `ExerciseLibrary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
