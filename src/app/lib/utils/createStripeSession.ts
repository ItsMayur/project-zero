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

async function CreateStripeSession(item: Product) {
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
    success_url:
      "https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://localhost:3000/cancel",
  };

  const session = await stripe.checkout.sessions.create(NewProductRequest);
  return session.id;
}

export default CreateStripeSession;
