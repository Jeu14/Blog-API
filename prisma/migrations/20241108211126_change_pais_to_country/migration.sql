/*
  Warnings:

  - You are about to drop the column `pais` on the `authors` table. All the data in the column will be lost.
  - Added the required column `country` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" ADD COLUMN "country" CHAR(2) DEFAULT 'BR';
UPDATE "authors" SET "country" = "pais";
ALTER TABLE "authors" DROP COLUMN "pais";
