import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
export const config = {
  api: {
    bodyParser: false, // Disable body parsing to get the raw body
  },
};

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

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Ensure metadata exists
        const userId = paymentIntent.metadata.user_id;
        const productsId = paymentIntent.metadata.products_id;
        const cartsId = paymentIntent.metadata.carts_id;

        if (!userId || !productsId || !cartsId) {
          console.error("Missing metadata in paymentIntent");
          return new NextResponse("Webhook Error: Missing metadata", {
            status: 400,
          });
        }

        const products = await prisma.product.findMany({
          where: { id: { in: JSON.parse(productsId) } },
        });

        const user = await prisma.user.findUnique({
          where: { id: JSON.parse(userId) },
        });

        if (!user) {
          console.error("User not found");
          return new NextResponse("Webhook Error: User not found", {
            status: 404,
          });
        }

        await prisma.cart.deleteMany({
          where: { id: { in: JSON.parse(cartsId) } },
        });

        const order = await prisma.order.create({
          data: {
            total_price: paymentIntent.amount / 100,
            address: "address", // Update with actual address
            payment_id: paymentIntent.id,
            user: {
              connect: { id: user.id },
            },
            products: {
              connect: products.map((product) => ({ id: product.id })),
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
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
