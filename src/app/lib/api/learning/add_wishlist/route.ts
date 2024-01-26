import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

interface CourseWishlist {
  user_id: number;
  course_id: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieList = cookies();
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }
    // CREATING A COURSE FOR REFERENCE IN BACKEND
    const addCourse: CourseWishlist = {
      user_id: tokenDetails.user_id,
      course_id: body.course_id,
    };
    // CHECKING IF COURSE ALREADY EXIST
    const isCourseExist = await db.courses.findUnique({
      where: {
        id: addCourse.course_id,
      },
    });
    // CHECKING IF COURSE ALREADY IN CART OR NOT
    const isAlreadyInCart = await db.coursewishlist.findMany({
      where: {
        course_id: addCourse.course_id,
        user_id: addCourse.user_id,
      },
    });
    // IF COURSE EXIST AND IN CART THEN UPDATE THE CART ITEM
    if (Boolean(isCourseExist) && Boolean(isAlreadyInCart.length)) {
      return NextResponse.json(
        { message: "Course Already in wishlist" },
        { status: 200 }
      );
    }
    // IF COURSE IS NOT IN CART THEN CREATE THE COURSE IN CART
    else if (Boolean(isCourseExist)) {
      const newaddCourse = await db.coursewishlist.create({
        data: {
          user_id: addCourse.user_id,
          course_id: addCourse.course_id,
        },
      });
      return NextResponse.json(
        { newaddCourse, message: "Course Added to wishlist" },
        { status: 200 }
      );
    }
    // IF COURSE DON'T EXIST RETURN ERROR
    else {
      return NextResponse.json(
        { message: "Course Either deleted or not exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
