-- CreateTable
CREATE TABLE "coursewishlist" (
    "course_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "coursewishlist_pkey" PRIMARY KEY ("course_id","user_id")
);

-- AddForeignKey
ALTER TABLE "coursewishlist" ADD CONSTRAINT "coursewishlist_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursewishlist" ADD CONSTRAINT "coursewishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
