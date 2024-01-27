import { NextResponse } from "next/server";
import { db } from "../../../utils/db";
import { decrypt } from "../../../auth/session";
import { cookies } from "next/headers";

interface Course {
  instructure_id: number;
  course_thumbnail: string;
  title: string;
  discription: string;
  price: number;
  level: string;
  categories: object;
  lessons: object;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieList = cookies();

    const hasToken: boolean = cookieList.has("token");

    if (!hasToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }
    let tokenDetails;
    const token = cookieList.get("token");
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    const isCreator = await db.user.findUnique({
      where: {
        id: tokenDetails.user_id,
        role: "CREATOR",
      },
    });

    if (!isCreator) {
      return NextResponse.json(
        { message: "You are not a creator.Please register as a creator first" },
        { status: 404 }
      );
    }

    const Course: Course = {
      instructure_id: Number(tokenDetails.user_id),
      course_thumbnail: body.course_thumbnail,
      title: body.title,
      discription: body.discription,
      price: body.price,
      level: body.level,
      categories: body.categories,
      lessons: body.lessons,
    };
    const CreatedCourse = await db.courses.create({
      data: {
        instructure_id: Course.instructure_id,
        course_thumbnail: Course.course_thumbnail,
        title: Course.title,
        discription: Course.discription,
        price: Course.price,
        level: Course.level,
        categories: Course.categories,
        lessons: Course.lessons,
      },
    });

    return NextResponse.json({ Course: CreatedCourse }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
