"use client";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

import React, { useEffect, useState } from "react";

const page = () => {
  // CONSTANTS
  const stripePromise = loadStripe(
    "pk_test_51OaZCuSGbOR3OGLo9ULcrJfaYex5J0QFjxGjFUPJWEfueTUddDRMA9KshzuSa3yAnpIIyHiS9NlsxGmIX6jnsK6900sHjoZgAb"
  );
  const status = useSearchParams().get("status");
  const [loading, setLoading] = useState(false);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const [product, setProduct] = useState({
    id: "",
    seller_id: "",
    title: "",
    discription: "",
    price: "",
    quantity_available: "",
    categories: { category: [""] },
    images: { image_url: [""] },
  });
  const searchParams = useSearchParams();

  //   PRODUCT DATA FETCH FUNCTION
  const getProductData = async (product_id: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
        }),
      };
      const response = await fetch("/lib/api/marketplace/get_product", options);
      const product = await response.json();
      setProduct(product);
    } catch (error) {
      console.log(error);
    }
  };
  //   REVIEW FETCHING FUNCTION
  const getReviews = async (product_id: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
        }),
      };
      const response = await fetch("/lib/api/marketplace/get_product", options);
      const product = await response.json();
      setProduct(product);
    } catch (error) {
      console.log(error);
    }
  };
  //   ADDING PRODUCT TO CART
  const add_cart = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 2,
        }),
      };
      const response = await fetch("/lib/api/marketplace/add_cart", options);
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };
  //   BUYING PRODUCT API
  const buy_now = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 3,
          product_id: 3,
        }),
      };
      const response = await fetch("/lib/api/marketplace/buy_product", options);
      const productSessionID = await response.json();
      if (stripe == null) {
        console.log("Please Try again later");
      } else {
        const result = await stripe.redirectToCheckout({
          sessionId: productSessionID.session_id,
        });
        console.log(result);

        if (result.error) {
          alert(result.error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const product_id = searchParams.get("product_id");
    if (product_id) {
      getProductData(product_id);
    }
  }, [searchParams]);

  return (
    <div className="bg-themeColor1 text-text1 mb-[50px]">
      <div className="flex overflow-x-scroll w-screen snap-x snap-proximity">
        {product.images.image_url.map((res, idx) => {
          return <img src={res} alt="" className="snap-center" />;
        })}
      </div>
      <div className="px-4 py-6 space-y-2">
        <div className="space-y-1">
          <h3 className="text-xl text-bold">{product.title}</h3>
          <p className="italic text-themeColor3">Rs {product.price}</p>
          <p className="text-sm">{product.discription}</p>
        </div>
        <div className="space-y-1">
          <div
            className="bg-themeColor3 text-text1 text-center py-2"
            onClick={add_cart}
          >
            Add to cart
          </div>
          <div
            className="bg-themeColor3 text-text1 text-center py-2"
            onClick={buy_now}
          >
            {loading ? "Processing" : "Buy now"}
          </div>
        </div>
        <div>
          <h3>Reviews</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
