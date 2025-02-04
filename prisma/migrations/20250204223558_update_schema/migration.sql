/*
  Warnings:

  - Added the required column `gender` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "imageUrl" TEXT;
