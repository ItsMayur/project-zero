import { db } from "@/app/lib/utils/db";
import { RatingCalculator } from "@/app/lib/utils/review";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product_id: number = Number(body.product_id);
    let ratingResponse;

    const rating = (await RatingCalculator(product_id))._avg;
    if (
      rating.value != null &&
      rating.service != null &&
      rating.quality != null &&
      rating.packaging != null
    ) {
      ratingResponse = {
        quality: 1.5,
        value: 2.5,
        service: 3.5,
        packaging: 3,
        total:
          (rating.value + rating.service + rating.quality + rating.packaging) /
          4,
      };
    }

    const productsResult = await db.product.findFirst({
      where: {
        id: product_id,
      },
    });

    return NextResponse.json(
      { product: productsResult, rating: ratingResponse },
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);
  }
}
