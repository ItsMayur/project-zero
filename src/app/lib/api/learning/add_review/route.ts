"use server";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/utils/db";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

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
    const cookieList = cookies();

    const hasToken: boolean = cookieList.has("token");

    if (!hasToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    console.log(tokenDetails);

    const courseReview: coursereview = {
      user_id: tokenDetails.user_id,
      course_id: body.course_id,
      content: body.content,
      presentation: body.presentation,
      platform: body.platform,
      comment: body.comment,
    };

    const isCourseExist = await db.courses.findFirst({
      where: {
        id: courseReview.course_id,
      },
    });

    const isCourseReviewExist = await db.coursereview.findFirst({
      where: {
        user_id: courseReview.user_id,
        course_id: courseReview.course_id,
      },
    });

    if (!Boolean(isCourseExist)) {
      return NextResponse.json(
        { message: "Product Not exist" },
        { status: 404 }
      );
    }
    if (Boolean(isCourseReviewExist)) {
      const newCourseReview = await db.coursereview.updateMany({
        where: {
          user_id: courseReview.user_id,
          course_id: courseReview.course_id,
        },
        data: {
          content: courseReview.content,
          presentation: courseReview.presentation,
          platform: courseReview.platform,
          comment: courseReview.comment,
        },
      });

      return NextResponse.json({ message: "Review Updated" }, { status: 200 });
    }

    const newCourseReview = await db.coursereview.create({
      data: {
        user_id: courseReview.user_id,
        course_id: courseReview.course_id,
        content: courseReview.content,
        presentation: courseReview.presentation,
        platform: courseReview.platform,
        comment: courseReview.comment,
      },
    });

    return NextResponse.json({ message: "Review Added" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
