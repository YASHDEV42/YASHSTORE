import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Order, Product } from "@/types";
import { Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user as any;
  if (!user) {
    redirect("/login");
  }
  const allorders: any = await prisma.order.findMany();
  const orders: any = await prisma.order.findMany({
    where: { user_id: user?.id },
    include: {
      products: true,
    },
  });
  const reverseOrders = [...orders].reverse();
  console.log(orders);

  return (
    <section className="center-col gap-10 h-screen w-screen">
      <h1 className="">My Orders</h1>
      {reverseOrders && reverseOrders.length > 0 ? (
        reverseOrders.map((order: Order, index: number) => (
          <Link
            href={`/orders/${order.id}`}
            key={order.id}
            className="flex justify-between gap-10 items-center flex-row w-[45rem]  bg-gold-light p-3 rounded-md border-2 border-gold-light
          hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:border-gold hover:border-2 transition duration-300 ease-in-out"
          >
            <h2 className="text-4xl">order {index + 1}</h2>
            <h3 className="text-2xl font-semibold">
              Total Price:{" "}
              <span
                className="
            bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
              "
              >
                {order.total_price}
              </span>
            </h3>
            <h3 className="text-lg italic opacity-80 font-semibold">
              {order.created_at.toUTCString()}
            </h3>
          </Link>
        ))
      ) : (
        <h2 className="text-2xl font-semibold">No orders yet 😔</h2>
      )}
    </section>
  );
};

export default page;
