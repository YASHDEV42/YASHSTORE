import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error("Missing Stripe signature or webhook secret");
      return new NextResponse("Webhook Error: Missing signature or secret", {
        status: 400,
      });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook verification error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const userId = JSON.parse(paymentIntent.metadata.user_id.toString());
      const productsId = JSON.parse(
        paymentIntent.metadata.products_id.toString()
      );
      const products = await prisma.product.findMany({
        where: { id: { in: productsId } },
      });
      const cartsId = JSON.parse(paymentIntent.metadata.carts_id.toString());

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      await prisma.cart.deleteMany({
        where: { id: { in: cartsId } },
      });
      const order = await prisma.order.create({
        data: {
          total_price: paymentIntent.amount / 100,
          address: "adress",
          payment_id: paymentIntent.id,
          user: {
            connect: { id: userId },
          },
          products: {
            connect: productsId.map((productId: string) => ({ id: productId })),
          },
        },
        include: { products: true },
      });

      console.log("Created new order with products:", order);

      revalidatePath("/");
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
