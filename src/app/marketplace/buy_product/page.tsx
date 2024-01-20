"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const testPayment = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(
    "pk_test_51OaZCuSGbOR3OGLo9ULcrJfaYex5J0QFjxGjFUPJWEfueTUddDRMA9KshzuSa3yAnpIIyHiS9NlsxGmIX6jnsK6900sHjoZgAb"
  );
  const getStripId = async () => {
    try {
      const stripe = await stripePromise;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      };
      const response = await fetch("/lib/api/marketplace/buy_product", options);
      const productSessionID = await response.json();
      if (stripe == null) {
        console.log("Please Try again later");
      } else {
        const result = await stripe.redirectToCheckout({
          sessionId: productSessionID.session_id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onClick={getStripId}>
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default testPayment;
