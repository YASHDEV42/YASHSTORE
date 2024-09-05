import { metadata } from "@/app/layout";
import { Cart, Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, products, cart, user } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        products_id: JSON.stringify(products.map((p: Product) => p.id)),
        carts_id: JSON.stringify(cart.map((c: Cart) => c.id)),
        user_id: JSON.stringify(user.id),
      },
    });

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the payment intent" },
      { status: 500 }
    );
  }
}
