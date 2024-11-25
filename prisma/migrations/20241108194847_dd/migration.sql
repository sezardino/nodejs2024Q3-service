/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::int,
ALTER COLUMN "created_at" SET DATA TYPE INTEGER,
ALTER COLUMN "updated_at" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::int,
ALTER COLUMN "updated_at" SET DATA TYPE INTEGER;
