-- AlterTable
ALTER TABLE `exercise` ADD COLUMN `muscleGroupId` INTEGER NULL,
    ADD COLUMN `weight` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `MuscleGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MuscleGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_muscleGroupId_fkey` FOREIGN KEY (`muscleGroupId`) REFERENCES `MuscleGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
