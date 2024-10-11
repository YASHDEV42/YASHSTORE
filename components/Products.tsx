"use client";
import Image from "next/image";
import { Product, User } from "@/types"; // Import your Product type
import Link from "next/link";
import AddToCart from "./buttons/AddToCart";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Products = ({ products, user }: { products: Product[]; user: User }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [prodcts, setProducts] = React.useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const handleMouseEnter = (id: string) => {
    setHoveredProduct(id);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full mt-20 lg:mt-28 px-4 md:px-6 lg:px-8 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-auto">
          <label
            htmlFor="search"
            className="block lg:inline text-lg font-semibold mb-2 lg:mb-0"
          >
            Search:
          </label>
          <input
            className="ml-0 lg:ml-3 text-lg font-semibold w-full lg:w-64 h-10
           border-2 border-gold rounded-md px-4
           focus:outline-none focus:ring-2 focus:ring-gold
           focus:border-transparent"
            type="text"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Mobile Category Selector */}
        <div className="lg:hidden w-full">
          <label
            htmlFor="category-select"
            className="block text-lg font-semibold mb-2"
          >
            Category:
          </label>
          <div className="relative">
            <select
              id="category-select"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="appearance-none w-full bg-white border-2 border-red-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-red-500"
            >
              <option value="">All</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Desktop Category Buttons */}
        <div className="hidden lg:flex flex-wrap justify-start lg:justify-end items-center w-full lg:w-auto mt-4 lg:mt-0">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
              ${
                selectedCategory === category
                  ? "bg-gradient-to-br from-[#FFD6A5] to-[#FFD699]"
                  : "bg-gradient-to-br from-[#FFE9CC] to-[#FFD6A5]"
              } 
              p-2 rounded-sm mr-2 mb-2 md:ml-3 md:mb-0 text-black font-semibold hover:bg-gradient-to-bl hover:shadow-lg transition-all duration-400
            `}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`
            ${
              selectedCategory === null
                ? "bg-gradient-to-br from-[#FFD6A5] to-[#FFD699]"
                : "bg-gradient-to-br from-[#FFE9CC] to-[#FFD6A5]"
            } 
            p-2 rounded-sm mr-2 mb-2 md:ml-3 md:mb-0 font-semibold hover:bg-gradient-to-bl hover:shadow-lg transition-all duration-400
          `}
          >
            All
          </button>
        </div>
      </div>
      <div
        className={`flex justify-center items-center flex-wrap gap-8  mx-auto mt-10 mb-10 product-list  ${
          hoveredProduct !== null ? "blurred" : ""
        }`}
      >
        {fillteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className={`product-item hover:border-2 bg-gold-light hover:border-gold w-80 h-[28rem] flex flex-col items-center justify-start gap-5 rounded-md shadow-md
            hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out ${
              hoveredProduct && product.id && hoveredProduct === product.id
                ? "hovered"
                : ""
            }`}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
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
                  className="rounded-md mt-5 h-72 border-2 border-gold"
                />
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
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
                    className="bg-gold-light ml-5 px-6 py-2 rounded-md border-2 border-gold font-bold "
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
