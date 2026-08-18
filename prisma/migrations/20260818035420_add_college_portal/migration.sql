-- CreateEnum
CREATE TYPE "CollegeRole" AS ENUM ('COLLEGE_ADMIN', 'COLLEGE_STAFF', 'COLLEGE_VIEWER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeId" TEXT;

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeAdmin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "role" "CollegeRole" NOT NULL DEFAULT 'COLLEGE_ADMIN',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_code_key" ON "College"("code");

-- CreateIndex
CREATE UNIQUE INDEX "College_email_key" ON "College"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeAdmin_userId_key" ON "CollegeAdmin"("userId");

-- CreateIndex
CREATE INDEX "CollegeAdmin_collegeId_idx" ON "CollegeAdmin"("collegeId");

-- CreateIndex
CREATE INDEX "User_collegeId_idx" ON "User"("collegeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeAdmin" ADD CONSTRAINT "CollegeAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeAdmin" ADD CONSTRAINT "CollegeAdmin_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
