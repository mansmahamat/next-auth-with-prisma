-- CreateTable
CREATE TABLE "Recruiter" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT,
    "website" TEXT,
    "bio" TEXT,
    "jobTitle" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_userId_key" ON "Recruiter"("userId");

-- AddForeignKey
ALTER TABLE "Recruiter" ADD CONSTRAINT "Recruiter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
