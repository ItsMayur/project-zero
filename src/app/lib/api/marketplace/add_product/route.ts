import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

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
    const cookieList = cookies();
    const token = cookieList.get("token");
    let tokenDetails;
    if (typeof token?.value == "string") {
      tokenDetails = await decrypt(token?.value);
    }
    // CHECKING IF USER IS SELLER OR NOT
    const isSeller = await db.user.findUnique({
      where: {
        id: tokenDetails.user_id,
        role: "SELLER",
      },
    });
    // CREATING A PRODUCT FOR REFERENCE IN BACKEND
    if (Boolean(isSeller)) {
      const product: Product = {
        seller_id: body.seller_id,
        title: body.title,
        discription: body.discription,
        price: body.price,
        quantity_available: body.quantity_available,
        categories: body.categories,
        images: body.images,
      };
      // CREATING PRODUCT IF IT IS SELLER
      const newProduct = await db.product.create({
        data: {
          seller_id: tokenDetails.user_id,
          title: product.title,
          discription: product.discription,
          price: product.price,
          quantity_available: product.quantity_available,
          categories: product.categories,
          images: product.images,
        },
      });
      return NextResponse.json(newProduct, { status: 200 });
    }
    // IF USER IS NOT SELLER RETURNING ERROR
    else {
      return NextResponse.json(
        {
          message:
            "Only Sellers can add products.Please register as a seller to sell",
        },
        { status: 401 }
      );
    }
    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
