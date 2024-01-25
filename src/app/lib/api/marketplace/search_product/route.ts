import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    // const search: string[] = body.search.split(" ");
    const search: string = body.search;
    const categories: string[] = body.categories;
    let productsResult;
    const numberOfProducts = body.product_count;
    let productsToSkip = (body.page - 1) * numberOfProducts;
    console.log(search, categories, productsToSkip, numberOfProducts);

    productsResult = await db.product.findMany({
      take: numberOfProducts,
      skip: productsToSkip,
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
    console.log(productsResult);

    return NextResponse.json(productsResult, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
