/*
  Warnings:

  - You are about to drop the column `status` on the `Developer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "status",
ADD COLUMN     "devStatus" TEXT;
