-- CreateTable
CREATE TABLE "productreviews" (
    "user_id" INTEGER NOT NULL,
    "reviewable_id" INTEGER NOT NULL,
    "rating" JSONB NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productreviews_pkey" PRIMARY KEY ("user_id","reviewable_id")
);

-- AddForeignKey
ALTER TABLE "productreviews" ADD CONSTRAINT "productreviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productreviews" ADD CONSTRAINT "productreviews_reviewable_id_fkey" FOREIGN KEY ("reviewable_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
