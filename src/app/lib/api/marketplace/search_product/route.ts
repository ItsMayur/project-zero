import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const search: string[] = body.search.split(" ");
    const categories: string[] = body.categories;
    let productsResult;
    const numberOfProducts = body.product_count;
    let productsToSkip = (body.page - 1) * numberOfProducts;

    productsResult = await db.product.findMany({
      take: numberOfProducts,
      skip: productsToSkip,
      where: {
        OR: [
          {
            title: {
              mode: "insensitive",
              in: search,
            },
          },
          {
            discription: {
              mode: "insensitive",
              in: search,
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
    return NextResponse.json(productsResult, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
