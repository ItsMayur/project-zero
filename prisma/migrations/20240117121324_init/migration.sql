-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "productwishlist" (
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "productwishlist_pkey" PRIMARY KEY ("product_id","user_id")
);

-- AddForeignKey
ALTER TABLE "productwishlist" ADD CONSTRAINT "productwishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productwishlist" ADD CONSTRAINT "productwishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
