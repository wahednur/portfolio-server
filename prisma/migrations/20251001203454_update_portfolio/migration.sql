/*
  Warnings:

  - You are about to drop the column `userId` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Portfolio" DROP CONSTRAINT "Portfolio_userId_fkey";

-- DropIndex
DROP INDEX "public"."Portfolio_userId_idx";

-- AlterTable
ALTER TABLE "public"."Portfolio" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Portfolio_authorId_idx" ON "public"."Portfolio"("authorId");

-- AddForeignKey
ALTER TABLE "public"."Portfolio" ADD CONSTRAINT "Portfolio_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
