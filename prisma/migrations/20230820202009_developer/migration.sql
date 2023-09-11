/*
  Warnings:

  - You are about to drop the column `name` on the `Developer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "name",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "full_name" TEXT;
