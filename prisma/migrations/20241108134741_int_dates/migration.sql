/*
  Warnings:

  - You are about to drop the column `created_at` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `artists` table. All the data in the column will be lost.
  - Changed the type of `created_at` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updated_at` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "artists" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" INTEGER NOT NULL;
