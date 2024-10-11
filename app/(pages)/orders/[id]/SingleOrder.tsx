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
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-darker to-gold-dark">
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
        bg-clip-text text-transparent bg-gradient-to-r from-gold-darker to-gold-dark
        "
        >
          products :
        </h2>
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
                  className="border-2 border-gold mb-2 h-40"
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

export default SingleOrder;
