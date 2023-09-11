-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "name" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_userId_key" ON "Developer"("userId");

-- AddForeignKey
ALTER TABLE "Developer" ADD CONSTRAINT "Developer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
