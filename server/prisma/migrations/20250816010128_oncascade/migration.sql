-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_CommenterID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_CommentID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_LikerID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_PostID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_PosterID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Request" DROP CONSTRAINT "Request_ReceiverID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Request" DROP CONSTRAINT "Request_SenderID_fkey";

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_PosterID_fkey" FOREIGN KEY ("PosterID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_CommenterID_fkey" FOREIGN KEY ("CommenterID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_LikerID_fkey" FOREIGN KEY ("LikerID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_CommentID_fkey" FOREIGN KEY ("CommentID") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_SenderID_fkey" FOREIGN KEY ("SenderID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_ReceiverID_fkey" FOREIGN KEY ("ReceiverID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
