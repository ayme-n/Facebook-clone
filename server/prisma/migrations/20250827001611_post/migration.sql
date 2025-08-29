-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "PostID" INTEGER NOT NULL DEFAULT 67;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
