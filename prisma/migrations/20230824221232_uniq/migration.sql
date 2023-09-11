/*
  Warnings:

  - A unique constraint covering the columns `[developerId]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_developerId_key" ON "Experience"("developerId");
