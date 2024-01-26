import { NextResponse } from "next/server";
import { db } from "../../../utils/db";
import { decrypt } from "../../../auth/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieList = cookies();

    const hasToken: boolean = cookieList.has("token");

    let tokenDetails;
    let CourseResponse;
    if (!hasToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }
    const token = cookieList.get("token");
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    const isPaid = true;
    const Course = await db.courses.findUnique({
      where: {
        id: body.course_id,
      },
    });

    if (!isPaid) {
      CourseResponse = {
        title: Course?.title,
        discription: Course?.discription,
        price: Course?.price,
        level: Course?.level,
        categories: Course?.categories,
        isPaid: false,
      };
    }
    if (isPaid) {
      CourseResponse = {
        title: Course?.title,
        discription: Course?.discription,
        price: Course?.price,
        level: Course?.level,
        categories: Course?.categories,
        isPaid: true,
        lessons: Course?.lessons,
      };
    }

    return NextResponse.json({ Course: CourseResponse }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
