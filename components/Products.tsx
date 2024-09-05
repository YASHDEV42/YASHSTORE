"use client";
import Image from "next/image";
import { Product, User } from "@/types"; // Import your Product type
import Link from "next/link";
import AddToCart from "./buttons/AddToCart";
import React from "react";

const Products = ({ products, user }: { products: Product[]; user: User }) => {
  const [prodcts, setProducts] = React.useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const uniqueCategories = Array.from(
    new Set(products.map((product: any) => product.category.name))
  );
  const [query, setQuery] = React.useState<string>("");
  const fillteredProducts = products.filter((product: any) => {
    const nameMatches = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const categoryMatches =
      selectedCategory === null || product.category.name === selectedCategory;
    return nameMatches && categoryMatches;
  });

  return (
    <section>
      <div className="flex flex-row justify-between items-center w-full mt-28">
        <div>
          <label htmlFor="">Search :</label>
          <input
            className="ml-3 text-lg font-semibold w-64 h-10
           border-2 border-red-300 rounded-md px-4
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
        <div>
          {uniqueCategories.map((category) => {
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? " bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-sm ml-3 text-white hover:bg-gradient-to-bl hover:shadow-lg transition-all duration-400"
                    : " bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-sm ml-3 text-white hover:bg-gradient-to-bl hover:shadow-lg transition-all duration-400"
                }
              >
                {category}
              </button>
            );
          })}
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-sm ml-3 text-white hover:bg-gradient-to-bl hover:shadow-lg transition-all duration-400"
          >
            All
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-8  mx-auto mt-10 mb-10">
        {fillteredProducts.map((product) => {
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
              {user && user.role === "ADMIN" ? (
                <div className="flex justify-between items-center w-full">
                  <Link
                    href={`/dashboard/edit-product/${product.id}`}
                    className="bg-red-200 ml-5 px-6 py-2 rounded-md border-2 border-red-300 font-bold "
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <AddToCart product_id={product.id} user_id={user && user.id} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
