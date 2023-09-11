/*
  Warnings:

  - You are about to drop the column `full_name` on the `Developer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "full_name",
ADD COLUMN     "fullName" TEXT;
