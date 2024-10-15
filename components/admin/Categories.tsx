"use client";
import { category, Product } from "@/types";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Categories = ({
  categories,
  products,
}: {
  categories: any;
  products: any;
}) => {
  const [allCategories, setAllCategories] = useState<category[]>(categories);
  console.log(allCategories);

  const [query, setQuery] = useState<string>("");
  const fillterCategories = allCategories.filter((category) => {
    return category.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="w-full px-16 mt-24 ">
      <div className="mb-5">
        <h1 className="mb-4">Categories</h1>
        <label htmlFor="">Search :</label>
        <input
          className="ml-3 text-lg font-semibold w-64 h-10
           border-2 border-gold rounded-md px-2
           focus:outline-none focus:ring-2 focus:ring-gold
           focus:border-transparent"
          type="text"
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {fillterCategories.length === 0 ? (
        <h2 className="text-4xl text-center mt-10">no categories found</h2>
      ) : (
        fillterCategories.map((category) => {
          return (
            <Link
              href={`/dashboard/categories/${category.id}`}
              key={category.id}
              className="bg-gold-light h-16 w-full flex justify-between items-center flex-row mb-3 px-2 rounded-md
              hover:bg-gold-middle hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center flex-row w-1/2">
                <span className="flex justify-center items-center flex-row gap-3">
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                </span>
                <h3 className="text-lg font-bold">
                  contains{" "}
                  {
                    products.filter(
                      (product: Product) => product.category_id === category.id
                    ).length
                  }{" "}
                  Product
                </h3>
              </div>
              <h3 className="italic">
                created : {category.created_at.toUTCString()}
              </h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Categories;
