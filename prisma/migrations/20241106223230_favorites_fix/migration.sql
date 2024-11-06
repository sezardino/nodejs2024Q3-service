/*
  Warnings:

  - You are about to drop the column `userId` on the `Favorites` table. All the data in the column will be lost.
  - Added the required column `favoritesId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_userId_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "favoritesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
