import { NextResponse } from "next/server";
import { db } from "../../../utils/db";
import { hash } from "bcrypt";
import { encrypt } from "../../../auth/session";

interface USER {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  bio: string;
  profile_pic: string;
  role: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // CREATING USER FROM THE USER INPUT DATA

    // USER VALIDATIONS

    // Check if email already exist or not
    const isEmailExist = await db.user.findUnique({
      where: { email: body.email },
    });
    if (isEmailExist) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exist",
        },
        { status: 409 }
      );
    }

    // Check if username already exist or not
    const isUsernameExist = await db.user.findUnique({
      where: { username: body.username },
    });
    if (isUsernameExist) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exist",
        },
        { status: 409 }
      );
    }

    let hashedPass: string = await hash(body.password, 10);
    console.log(body.last_name);

    const user: USER = {
      username: body.username,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      password_hash: hashedPass,
      bio: "",
      profile_pic: "",
      role: "USER",
    };

    const newUser = await db.user.create({
      data: {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password_hash: user.password_hash,
        bio: user.bio,
        profile_pic: user.profile_pic,
        role: user.role,
      },
    });

    const token = await encrypt(newUser.username, newUser.id, user.role);

    return NextResponse.json(
      {
        token: token,
        message: "USER CREATED SUCESSFULLY",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
