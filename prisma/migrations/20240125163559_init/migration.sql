-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "instructure_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "categories" JSONB NOT NULL,
    "lessons" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
