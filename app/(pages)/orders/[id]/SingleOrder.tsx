import { Order } from "@/types";
import Image from "next/image";
import React from "react";

type Props = {};

const SingleOrder = ({ order }: { order: Order }) => {
  return (
    <section className="center-col">
      <div className="mt-24">
        <div className="flex justify-start items-center flex-col gap-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Status:{" "}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-red-500">
              {order.status}
            </span>
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Amount:{" "}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500">
              {order.total_price}$
            </span>
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            User: {order.user.email}
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Adress: {order.adress}
          </h2>
        </div>
        <hr className="my-10" />
        <h2
          className="text-4xl md:text-5xl lg:text-6xl mb-10 uppercase font-bold
        bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-red-500
        "
        >
          products :
        </h2>
        <ul className="center-col gap-10">
          {order.products.map((product) => (
            <li
              key={product.id}
              className="flex justify-start items-center flex-col gap-3"
            >
              <Image
                src={product.image_url[0]}
                alt={product.name}
                width={300}
                height={300}
                style={{
                  objectFit: "contain",
                }}
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                {product.name}
              </h2>
              <p>{product.description}</p>
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-semibold 
                bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500"
              >
                {product.price}&#36;
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SingleOrder;
