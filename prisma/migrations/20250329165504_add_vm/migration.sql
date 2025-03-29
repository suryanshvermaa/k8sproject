/*
  Warnings:

  - Added the required column `duration` to the `VM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VM" ADD COLUMN     "duration" INTEGER NOT NULL;
