import { constructStripeEvent } from "@/app/lib/utils/createStripeSession";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  console.log("reached" + req.json());

  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = await constructStripeEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }

      if (!event.data.object.metadata.itinerary_id) {
        throw new Error(`missing itinerary_id on metadata, ${event.id}`);
      }
      console.log(event.data.object.metadata.itinerary_id);

      // updateDatabase(event.data.object.metadata.itinerary_id);
      // sendEmail(event.data.object.customer_details.email);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
