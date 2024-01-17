"use server";
import { NextResponse } from "next/server";
import { db } from "../../utils/db";
import { encrypt, decrypt } from "./../../auth/session";
import { compare } from "bcrypt";

async function checkUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email: email },
  });
  if (typeof user?.password_hash === "string") {
    const passwordSame = await compare(password, user.password_hash);
    if (passwordSame) {
      const token = await encrypt(user.username, user.id, user.role);

      return [passwordSame, token];
    }
  }
  return [false, ""];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // LOGIN USER FROM THE USER INPUT DATA

    // USER VALIDATIONS

    // Check if email already exist or not
    const isEmailExist = await db.user.findUnique({
      where: { email: body.email },
    });
    if (!isEmailExist) {
      return NextResponse.json(
        {
          user: null,
          message: "EMAIL DON'T EXIST",
        },
        { status: 409 }
      );
    }

    // Checking the hash password with given password

    const isPasswordSame = await checkUser(body.email, body.password);

    if (!isPasswordSame[0]) {
      return NextResponse.json(
        {
          user: null,
          message: "AUTH FAILED : PLEASE TRY AGAIN",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "LOGGED IN SUCCESSFULLY",
        token: isPasswordSame[1],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
