-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_users_TypesId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "users_TypesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_users_TypesId_fkey" FOREIGN KEY ("users_TypesId") REFERENCES "users_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
