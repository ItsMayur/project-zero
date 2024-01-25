import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

export async function POST(req: Request) {
  var CartItems: object[] = [];
  var AllProductId: number[] = [];
  try {
    const cookieList = cookies();
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }

    // CHECKING IF PRODUCT ALREADY IN CART OR NOT
    const Products = await db.productwishlist.findMany({
      where: {
        user_id: tokenDetails.user_id,
      },
    });
    Products.map(async (Product, idx) => {
      AllProductId.push(Product.product_id);
    });
    const CartItems = await db.product.findMany({
      where: {
        id: {
          in: AllProductId,
        },
      },
    });

    return NextResponse.json({ cart_items: CartItems }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
