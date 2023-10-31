/*
  Warnings:

  - Made the column `last_date_acess` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "last_date_acess" SET NOT NULL,
ALTER COLUMN "last_date_acess" DROP DEFAULT;
