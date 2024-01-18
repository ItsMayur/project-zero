"use server";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/utils/db";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";
import { RatingCalculator } from "@/app/lib/utils/review";

interface productreview {
  user_id: number;
  reviewable_id: number;
  rating: {
    // Quality of product
    quality: number;
    // Value for money
    value: number;
    // Customer service {Delivery timing,Complain solving}
    service: number;
    // Packaging
    packaging: number;
  };
  comment: string;
}

export async function POST(req: Request) {
  RatingCalculator(3);
  try {
    const body = await req.json();
    const cookieList = cookies();
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    const productreview: productreview = {
      user_id: tokenDetails.user_id,
      reviewable_id: body.reviewable_id,
      rating: {
        quality: body.rating.quality,
        value: body.rating.value,
        service: body.rating.service,
        packaging: body.rating.packaging,
      },
      comment: body.comment,
    };

    const isProductExist = await db.product.findFirst({
      where: {
        id: productreview.reviewable_id,
      },
    });

    const isProductReviewExist = await db.productreviews.findFirst({
      where: {
        user_id: productreview.user_id,

        reviewable_id: productreview.reviewable_id,
      },
    });

    if (!Boolean(isProductExist)) {
      return NextResponse.json(
        { message: "Product Not exist" },
        { status: 404 }
      );
    }
    if (Boolean(isProductReviewExist)) {
      const newProductReview = await db.productreviews.updateMany({
        where: {
          user_id: productreview.user_id,
          reviewable_id: productreview.reviewable_id,
        },
        data: {
          rating: {
            quality: productreview.rating.quality,
            value: productreview.rating.value,
            service: productreview.rating.service,
            packaging: productreview.rating.packaging,
          },
          comment: productreview.comment,
        },
      });

      return NextResponse.json({ message: "Review Updated" }, { status: 200 });
    }

    const newProductReview = await db.productreviews.create({
      data: {
        user_id: productreview.user_id,
        reviewable_id: productreview.reviewable_id,
        rating: {
          quality: productreview.rating.quality,
          value: productreview.rating.value,
          service: productreview.rating.service,
          packaging: productreview.rating.packaging,
        },
        comment: productreview.comment,
      },
    });

    return NextResponse.json({ message: "Review Added" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
