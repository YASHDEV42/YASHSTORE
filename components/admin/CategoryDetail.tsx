"use client";
import { Product } from "@/types";
import React, { useState } from "react";
import DeleteBtn from "../buttons/DeleteBtn";
import { deleteProduct } from "@/actions/Products";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const CategoryDetail = ({
  categoryProducts,
}: {
  categoryProducts: Product[];
}) => {
  const [allCategoryProducts, setAllCategoryProducts] =
    useState<Product[]>(categoryProducts);
  console.log(allCategoryProducts);

  const [query, setQuery] = useState<string>("");
  const fillterCategoryProducts = allCategoryProducts.filter((product) => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="w-full px-16 mt-24 ">
      <div className="mb-5">
        <h1 className="mb-4">Categories</h1>
        <label htmlFor="">Search :</label>
        <input
          className="ml-3 text-lg font-semibold w-64 h-10
           border-2 border-red-300 rounded-md px-2
           focus:outline-none focus:ring-2 focus:ring-red-300
           focus:border-transparent"
          type="text"
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {fillterCategoryProducts.length === 0 ? (
        <h2 className="text-4xl text-center mt-10">no categories found</h2>
      ) : (
        fillterCategoryProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-red-100 h-16 w-full flex justify-between items-center flex-row mb-3 px-2 rounded-md
              hover:bg-red-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center flex-row w-72">
                <span className="flex justify-center items-center flex-row gap-3">
                  <Image
                    src={product.image_url[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-lg h-12 w-12"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                </span>
                <h3 className="text-lg font-bold">{product.price}$</h3>
              </div>
              <div className="center-row gap-3">
                <Link
                  href={`/dashboard/edit-product/${product.id}`}
                  className="bg-red-100 px-6 py-2 rounded-md border-2 border-red-300 font-bold "
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    await deleteProduct(product.id);
                  }}
                >
                  <DeleteBtn />
                </form>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoryDetail;
