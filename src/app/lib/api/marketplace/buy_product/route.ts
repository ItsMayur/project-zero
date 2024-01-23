import { NextResponse } from "next/server";

import { db } from "@/app/lib/utils/db";
import { CreateStripeSession } from "@/app/lib/utils/createStripeSession";

interface Item {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
    };
  };
  quantity: number;
}

interface Product {
  seller_id: number;
  title: string;
  discription: string;
  price: number;
  quantity_available: number;
  categories: {
    category: string[];
  };
  images: {
    image_url: string[];
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await db.product.findUnique({
      where: {
        id: body.product_id,
      },
    });
    if (product != null) {
      const Item: Item = {
        price_data: {
          currency: "inr",
          unit_amount: product?.price,
          product_data: {
            name: product?.title,
            description: product?.discription,
            images: ["product?.images.image_url"],
          },
        },
        quantity: body.quantity,
      };
      console.log(Item);

      const session_id = await CreateStripeSession(Item, body.product_id);
      return NextResponse.json({ session_id: session_id }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product doesn't exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
