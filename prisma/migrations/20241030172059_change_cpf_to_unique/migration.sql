/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `authors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authors_cpf_key" ON "authors"("cpf");
