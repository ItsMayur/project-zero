import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product_id: number = Number(body.product_id);

    const productsResult = await db.product.findFirst({
      where: {
        id: product_id,
      },
    });

    return NextResponse.json(productsResult, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
