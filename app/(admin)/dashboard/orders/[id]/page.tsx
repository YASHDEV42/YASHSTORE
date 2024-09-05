import prisma from "@/lib/db";
import { Order } from "@/types";
import Image from "next/image";
import React from "react";

type Props = {};

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const order = (await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  })) as unknown as Order;
  console.log(order);
  console.log(order.products);

  if (!order) {
    return <h1>Order Not Found</h1>;
  }
  return (
    <section className="mt-64 w-full px-16 ">
      <h1>Order Details</h1>
      <br />
      <h2 className="text-2xl font-semibold pb-1">Order ID: {id}</h2>
      <h2 className="text-2xl font-semibold pb-1">
        Order Status:{" "}
        <span
          className="text-3xl font-semibold
        bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500
        "
        >
          {order.status}
        </span>
      </h2>
      <h2 className="text-2xl font-semibold">
        Total Amount Paid:{" "}
        <span
          className="text-3xl font-semibold
        bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
        "
        >
          {order.total_price}$
        </span>
      </h2>
      <br />
      <hr />
      <br />
      <div>
        <h2
          className="text-4xl pb-1 font-bold
        bg-clip-text text-transparent bg-gradient-to-r from-red-950 to-red-500
        "
        >
          Products:
        </h2>
        <br />
        <ul className="flex justify-start items-start flex-row gap-16">
          {order.products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex justify-start items-center flex-col"
              >
                <Image
                  src={product.image_url[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  style={{
                    objectFit: "contain",
                  }}
                  className="border-2 border-red-600 mb-2 h-40"
                />
                <div>
                  <h2 className="text-2xl font-semibold pb-1">
                    {product.name}
                  </h2>
                  <h3 className="text-2xl pb-1 font-semibold">
                    Price:{" "}
                    <span
                      className="text-2xl font-bold
        bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
        
        "
                    >
                      {" "}
                      {product.price}$
                    </span>
                  </h3>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default page;
