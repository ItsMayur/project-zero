/*
  Warnings:

  - Added the required column `course_thumbnail` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_thumbnail" TEXT NOT NULL;
