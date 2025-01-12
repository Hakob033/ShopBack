/*
  Warnings:

  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_sku_key` ON `product`;

-- AlterTable
ALTER TABLE `product`ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),    
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
