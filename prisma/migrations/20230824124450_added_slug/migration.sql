/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");
