import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

export async function POST(req: Request) {
  var CourItems: object[] = [];
  var AllCourseId: number[] = [];
  try {
    const cookieList = cookies();
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    // CHECKING IF PRODUCT ALREADY IN CART OR NOT
    const Courses = await db.coursewishlist.findMany({
      where: {
        user_id: tokenDetails.user_id,
      },
    });
    Courses.map(async (Course, idx) => {
      AllCourseId.push(Course.course_id);
    });
    const CartItems = await db.courses.findMany({
      where: {
        id: {
          in: AllCourseId,
        },
      },
    });

    return NextResponse.json({ cart_items: CartItems }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
