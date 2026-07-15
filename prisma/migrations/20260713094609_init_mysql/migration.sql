-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'ASSESSOR',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assessment` (
    `id` VARCHAR(191) NOT NULL,
    `assessmentNumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `customerName` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `insuranceCompany` VARCHAR(191) NOT NULL,
    `claimNumber` VARCHAR(191) NOT NULL,
    `registrationNumber` VARCHAR(191) NULL,
    `vin` VARCHAR(191) NULL,
    `odometer` VARCHAR(191) NULL,
    `vehicleNotes` VARCHAR(191) NULL,
    `aiRawResponse` VARCHAR(191) NULL,
    `verifiedVehicleJson` VARCHAR(191) NULL,
    `verifiedDamageJson` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Assessment_assessmentNumber_key`(`assessmentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentImage` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `assessmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleMake` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VehicleMake_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleModel` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `makeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VehicleModel_name_makeId_key`(`name`, `makeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleVariant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `modelId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VehicleVariant_name_modelId_key`(`name`, `modelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehiclePart` (
    `id` VARCHAR(191) NOT NULL,
    `partNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `labourCost` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `variantId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentDamagedPart` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,
    `assessmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentReplacementPart` (
    `id` VARCHAR(191) NOT NULL,
    `partName` VARCHAR(191) NOT NULL,
    `partNumber` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `unitPrice` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,
    `vehiclePartId` VARCHAR(191) NULL,
    `assessmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Supplier_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupplierPartPrice` (
    `id` VARCHAR(191) NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `partName` VARCHAR(191) NOT NULL,
    `vehicleMake` VARCHAR(191) NULL,
    `vehicleModel` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InspectionItem` (
    `id` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `assessmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentImage` ADD CONSTRAINT `AssessmentImage_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleModel` ADD CONSTRAINT `VehicleModel_makeId_fkey` FOREIGN KEY (`makeId`) REFERENCES `VehicleMake`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleVariant` ADD CONSTRAINT `VehicleVariant_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `VehicleModel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiclePart` ADD CONSTRAINT `VehiclePart_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `VehicleVariant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentDamagedPart` ADD CONSTRAINT `AssessmentDamagedPart_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentReplacementPart` ADD CONSTRAINT `AssessmentReplacementPart_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierPartPrice` ADD CONSTRAINT `SupplierPartPrice_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InspectionItem` ADD CONSTRAINT `InspectionItem_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
