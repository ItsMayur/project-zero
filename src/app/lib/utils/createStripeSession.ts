const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Product {
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
const redirectURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/marketplace/buy_product"
    : "https://stripe-checkout-next-js-demo.vercel.app";

export async function CreateStripeSession(item: Product, product_id: number) {
  const NewProductRequest = {
    line_items: [
      {
        price_data: {
          currency: item.price_data.currency,
          unit_amount: item.price_data.unit_amount * 100,
          product_data: {
            name: item.price_data.product_data.name,
            description: item.price_data.product_data.description,
            images: item.price_data.product_data.images,
          },
        },
        quantity: item.quantity,
      },
    ],
    mode: "payment",
    success_url: redirectURL + "/success?itineraryId=" + product_id,
    cancel_url: redirectURL + "?status=cancel",
  };

  const session = await stripe.checkout.sessions.create(NewProductRequest);
  return session.id;
}

export async function constructStripeEvent(
  body: any,
  signature: any,
  secret: any
) {
  const event = await stripe.webhooks.constructEvent(body, signature, secret);
  return event;
}
