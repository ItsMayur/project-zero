"use client";
import { useRouter } from "next/navigation";
import React, {
  FC,
  ReactComponentElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const page = () => {
  const router = useRouter();
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const get_cart_items = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/lib/api/marketplace/get_cart", options);
      const cart = (await response.json()).cart_items;
      if (cartItems.length == 0) {
        cart.map((Item: any) => {
          cartItems.push(Item);
        });
      }
      if (cartItems.length != 0) {
        setIsCartFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_cart_items();
  }, []);

  return (
    <div className="bg-themeColor1 h-screen overflow-scroll relative flex items-center  flex-col">
      <div className="text-text1 text-lg w-screen text-center py-2 fixed top-0 bg-themeColor1">
        Cart
      </div>
      <div className="text-text1 my-16 mx-2">
        {isCartFetched ? (
          <div className="space-y-16 overflow-auto">
            {cartItems.map((Item, key) => {
              return (
                <div
                  className="flex"
                  onClick={() => {
                    router.push(
                      `/marketplace/product_page?product_id=${Item.id}`
                    );
                  }}
                >
                  <div className="">
                    <img
                      src={Item.images.image_url[0]}
                      className="w-[400px] aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="space-y-4 flex justify-center flex-col">
                    <div className="text-sm mx-2">{Item.title}</div>
                    <div className="text-sm mx-4  text-themeColor3 italic">
                      Rs {Item.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>NO ITEMS IN YOUR CART</div>
        )}
      </div>
    </div>
  );
};

export default page;
