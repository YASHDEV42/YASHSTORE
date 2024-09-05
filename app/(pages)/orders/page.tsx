import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Order, Product } from "@/types";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user as any;
  console.log(user);

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
    <section className="center-col gap-6 mt-24">
      <h1 className="mb-10">My Orders</h1>
      {reverseOrders && reverseOrders.length > 0 ? (
        reverseOrders.map((order: Order, index: number) => (
          <Link
            href={`/orders/${order.id}`}
            key={order.id}
            className="flex justify-start gap-10 items-center flex-row w-[45rem]  bg-red-100 p-3 rounded-md
          hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:border-red-300 transition duration-300 ease-in-out"
          >
            <h2 className="text-4xl">order {index + 1}</h2>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Products :</h2>
              {order.products.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center w-full"
                >
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-xl font-semibold">{product.price}$</p>
                </div>
              ))}
              <h3>{order.created_at.toUTCString()}</h3>
            </div>
          </Link>
        ))
      ) : (
        <h2 className="text-2xl font-semibold">No orders yet 😔</h2>
      )}
    </section>
  );
};

export default page;
