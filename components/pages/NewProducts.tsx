import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../buttons/AddToCart";
import { Product } from "@/types";

type Props = {};

const NewProducts = ({
  newProducts,
  user,
}: {
  newProducts: any;
  user: any;
}) => {
  console.log(newProducts);

  return (
    <section>
      <h1 className="mt-10 p-24">New Products</h1>
      <div className="flex justify-center items-center flex-wrap gap-8  mx-auto  mb-10">
        {newProducts.map((product: Product) => {
          return (
            <div
              key={product.id}
              className=" bg-red-100 border-2 border-red-200 w-80 h-[28rem] flex flex-col items-center justify-start gap-5 rounded-md shadow-md
            hover:shadow-lg hover:scale-105 hover:border-red-300 transition duration-300 ease-in-out"
            >
              <Link
                href={`/products/${product.id}`}
                className="flex flex-col justify-start items-start gap-5"
              >
                <Image
                  src={product.image_url[0]}
                  alt={product.name}
                  width={270}
                  height={250}
                  placeholder="empty"
                  style={{
                    objectFit: "contain",
                  }}
                  className="rounded-md mt-5 h-72 border-2 border-red-200"
                />
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <h3
                    className="text-3xl font-bold underline
                  bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
                  "
                  >
                    {product.price}$
                  </h3>
                </div>
              </Link>
              {user ? (
                user.role === "ADMIN" ? (
                  <div className="flex justify-between items-center w-full">
                    <Link
                      href={`/dashboard/edit-product/${product.id}`}
                      className="bg-red-200 ml-5 px-6 py-2 rounded-md border-2 border-red-300 font-bold "
                    >
                      Edit
                    </Link>
                  </div>
                ) : (
                  <AddToCart
                    product_id={product.id}
                    user_id={user && user.id}
                  />
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewProducts;
