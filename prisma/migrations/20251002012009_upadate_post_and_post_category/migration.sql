/*
  Warnings:

  - Added the required column `catId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "catId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."PostCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostCategory_name_key" ON "public"."PostCategory"("name");

-- CreateIndex
CREATE INDEX "Post_catId_idx" ON "public"."Post"("catId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "public"."Post"("authorId");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_catId_fkey" FOREIGN KEY ("catId") REFERENCES "public"."PostCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
