-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_PostID_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "PostID" SET DEFAULT 200;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
