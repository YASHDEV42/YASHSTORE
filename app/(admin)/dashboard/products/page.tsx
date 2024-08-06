import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen w-full mr-0 flex justify-center items-center flex-col">
      <h1>Products</h1>
      <div className="mt-10 w-full px-16">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-red-200 h-16 w-full flex justify-between items-center flex-row mb-3 pl-2 rounded-md"
            >
              <div className="flex justify-between items-center flex-row w-72">
                <span className="flex justify-center items-center flex-row gap-3">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <h2>{product.name}</h2>
                </span>
                <h3>{product.price}$</h3>
              </div>
              <div>
                <button className="primary-btn">delete</button>
                <button className="secondary-btn">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default page;
