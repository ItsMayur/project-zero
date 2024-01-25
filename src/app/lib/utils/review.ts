import { Prisma } from "@prisma/client";
import { db } from "./db";
import { json } from "stream/consumers";

async function RatingCalculator(product_id: number) {
  const Rating = await db.productreviews.aggregate({
    _avg: {
      quality: true,
      value: true,
      service: true,
      packaging: true,
    },
    where: {
      reviewable_id: product_id,
    },
  });

  return Rating;
}

export { RatingCalculator };
