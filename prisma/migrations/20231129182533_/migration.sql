/*
  Warnings:

  - You are about to drop the column `type` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "type",
ADD COLUMN     "typeImage" TEXT;
