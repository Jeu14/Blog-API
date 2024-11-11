/*
  Warnings:

  - Made the column `country` on table `authors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "authors" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" DROP DEFAULT;
