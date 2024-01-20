import { NextResponse } from "next/server";
import CreateStripeSession from "@/app/lib/utils/createStripeSession";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const Item: Item = {
      price_data: {
        currency: "inr",
        unit_amount: 200,
        product_data: {
          name: "T-shirt",
          description:
            " item.line_items[0].price_data.product_data.description",
          images: ["url1", "url2"],
        },
      },
      quantity: 2,
    };

    const session_id = await CreateStripeSession(Item);

    return NextResponse.json({ session_id: session_id }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
