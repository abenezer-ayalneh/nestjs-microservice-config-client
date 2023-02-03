/*
  Warnings:

  - A unique constraint covering the columns `[name,applicationId]` on the table `configurations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "configurations_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "configurations_name_applicationId_key" ON "configurations"("name", "applicationId");
