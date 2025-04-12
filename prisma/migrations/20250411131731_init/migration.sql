/*
  Warnings:

  - Made the column `password` on table `VM` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VM" ADD COLUMN     "vm" TEXT,
ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "password" SET NOT NULL;
