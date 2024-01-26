"use server";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/utils/db";
import { JsonValue } from "@prisma/client/runtime/library";

interface coursereview {
  user_id: number;
  course_id: number;
  content: number;
  presentation: number;
  platform: number;
  comment: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const isCoursesExist = await db.courses.findFirst({
      where: {
        id: body.course_id,
      },
    });

    if (!Boolean(isCoursesExist)) {
      return NextResponse.json(
        { message: "Courses Not exist" },
        { status: 404 }
      );
    }

    const CoursesReviews = await db.coursereview.findMany({
      where: {
        course_id: Number(body.course_id),
      },
    });

    return NextResponse.json({ Reviews: CoursesReviews }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
