-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "companyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isCurrentRole" BOOLEAN NOT NULL,
    "developerId" INTEGER,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
