/*
  Warnings:

  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Application";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Configuration";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0.0'
);

-- CreateTable
CREATE TABLE "configurations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,
    CONSTRAINT "configurations_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "configurations_name_key" ON "configurations"("name");
