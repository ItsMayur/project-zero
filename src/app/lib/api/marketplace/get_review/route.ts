"use server";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/utils/db";
import { JsonValue } from "@prisma/client/runtime/library";

interface productreview {
  user_id: number;
  reviewable_id: number;
  // Quality of product
  quality: number;
  // Value for money
  value: number;
  // Customer service {Delivery timing,Complain solving}
  service: number;
  // Packaging
  packaging: number;
  comment: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const isProductExist = await db.product.findFirst({
      where: {
        id: Number(body.product_id),
      },
    });

    if (!Boolean(isProductExist)) {
      return NextResponse.json(
        { message: "Product Not exist" },
        { status: 404 }
      );
    }

    const ProductReviews = await db.productreviews.findMany({
      where: {
        reviewable_id: Number(body.product_id),
      },
    });

    return NextResponse.json({ Reviews: ProductReviews }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
