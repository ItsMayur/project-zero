"use server";
import { NextResponse } from "next/server";
import { db } from "@/app/lib/utils/db";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

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
    const cookieList = cookies();

    const hasToken: boolean = cookieList.has("token");

    if (!hasToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    const productreview: productreview = {
      user_id: tokenDetails.user_id,
      reviewable_id: body.reviewable_id,
      quality: body.quality,
      value: body.value,
      service: body.service,
      packaging: body.packaging,
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
          quality: productreview.quality,
          value: productreview.value,
          service: productreview.service,
          packaging: productreview.packaging,
          comment: productreview.comment,
        },
      });

      return NextResponse.json({ message: "Review Updated" }, { status: 200 });
    }

    const newProductReview = await db.productreviews.create({
      data: {
        user_id: productreview.user_id,
        reviewable_id: productreview.reviewable_id,
        quality: productreview.quality,
        value: productreview.value,
        service: productreview.service,
        packaging: productreview.packaging,
        comment: productreview.comment,
      },
    });

    return NextResponse.json({ message: "Review Added" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
