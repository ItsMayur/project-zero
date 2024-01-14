import { NextResponse } from "next/server";
import { db } from "../../utils/db";
import { hash } from "bcrypt";
import { decrypt } from "../../auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.token === undefined) {
      return NextResponse.json(
        { message: "Session fail please log in again" },
        { status: 200 }
      );
    }

    const decryptedData = await decrypt(body.token);

    let output = {};
    // Check if id already exist or not
    const userData = await db.user.findUnique({
      where: { id: decryptedData.user_id },
    });
    if (userData) {
      output = {
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        bio: userData.bio,
        profile_pic: userData.profile_pic,
        role: userData.role,
        message: "User Exist",
      };
    } else {
      output = {};
    }

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
