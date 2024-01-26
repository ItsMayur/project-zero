-- CreateTable
CREATE TABLE "coursereview" (
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "content" INTEGER NOT NULL,
    "presentation" INTEGER NOT NULL,
    "platform" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coursereview_pkey" PRIMARY KEY ("user_id","course_id")
);

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
