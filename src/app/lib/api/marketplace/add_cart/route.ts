import { db } from "@/app/lib/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/session";

interface ProductWishlist {
  user_id: number;
  product_id: number;
  quantity: number;
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
    // CREATING A PRODUCT FOR REFERENCE IN BACKEND
    const addProduct: ProductWishlist = {
      user_id: tokenDetails.user_id,
      product_id: body.product_id,
      quantity: body.quantity,
    };
    // CHECKING IF PRODUCT ALREADY EXIST
    const isProductExist = await db.product.findUnique({
      where: {
        id: addProduct.product_id,
      },
    });
    // CHECKING IF PRODUCT ALREADY IN CART OR NOT
    const isAlreadyInCart = await db.productwishlist.findMany({
      where: {
        product_id: addProduct.product_id,
        user_id: addProduct.user_id,
      },
    });
    // IF PRODUCT EXIST AND IN CART THEN UPDATE THE CART ITEM
    if (Boolean(isProductExist) && Boolean(isAlreadyInCart.length)) {
      const newAddProduct = await db.productwishlist.updateMany({
        where: {
          product_id: addProduct.product_id,
          user_id: addProduct.user_id,
        },
        data: {
          quantity: addProduct.quantity,
        },
      });
      return NextResponse.json({ message: "Cart Updated" }, { status: 200 });
    }
    // IF PRODUCT IS NOT IN CART THEN CREATE THE PRODUCT IN CART
    else if (Boolean(isProductExist)) {
      const newAddProduct = await db.productwishlist.create({
        data: {
          user_id: addProduct.user_id,
          product_id: addProduct.product_id,
          quantity: addProduct.quantity,
        },
      });
      return NextResponse.json(
        { newAddProduct, message: "Product Added to cart" },
        { status: 200 }
      );
    }
    // IF PRODUCT DON'T EXIST RETURN ERROR
    else {
      return NextResponse.json(
        { message: "Product Either deleted or not exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
