import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    // const search: string[] = body.search.split(" ");
    const search: string = body.search;
    const categories: string[] = body.categories;
    let courseResult;
    const numberOfCourses = body.course_count;
    let coursesToSkip = (body.page - 1) * numberOfCourses;
    console.log(search, categories, coursesToSkip, numberOfCourses);

    courseResult = await db.courses.findMany({
      take: numberOfCourses,
      skip: coursesToSkip,
      where: {
        OR: [
          {
            title: {
              mode: "insensitive",
              contains: search,
            },
          },
          {
            discription: {
              mode: "insensitive",
              contains: search,
            },
          },
          {
            categories: {
              path: ["category"],
              array_contains: categories,
            },
          },
        ],
      },
    });
    console.log(courseResult);

    return NextResponse.json(courseResult, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
