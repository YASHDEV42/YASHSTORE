"use client";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import AddToCart from "../buttons/AddToCart";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

type Props = {};

const ProductDetail = ({ product, user }: { product: Product; user: any }) => {
  const [imgTracker, setImgTracker] = React.useState(0);
  const [loadingImage, setLoadingImage] = React.useState(false);

  const handleImg = (dir: string) => {
    setLoadingImage(true);
    if (dir === "next") {
      if (imgTracker === product.image_url.length - 1) {
        setImgTracker(0);
        setLoadingImage(false);
      } else {
        setImgTracker((prev) => prev + 1);
        setLoadingImage(false);
      }
    }
    if (dir === "prev") {
      if (imgTracker === 0) {
        setImgTracker(product.image_url.length - 1);
        setLoadingImage(false);
      } else {
        setImgTracker((prev) => prev - 1);
        setLoadingImage(false);
      }
    }
  };
  return (
    <section className="flex justify-center items-center flex-col lg:flex-row gap-10 lg:mt-6 mt-16">
      <div className="lg:w-2/3 w-full">
        {loadingImage ? (
          <div className="w-full h-[30rem] flex items-center justify-center">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        ) : (
          <Image
            src={product.image_url[imgTracker]}
            alt={product.name}
            width={400}
            height={400}
            style={{
              objectFit: "contain",
            }}
            className="rounded-md w-full h-[30rem] border-2 border-gold"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAABJRU5ErkJggg=="
          />
        )}

        <div className="w-full flex flex-row justify-between items-center mt-1">
          <button
            onClick={() => handleImg("prev")}
            className="flex flex-row capitalize items-center justify-center font-semibold"
          >
            <ArrowLeft /> <span className=" hidden lg:flex">prev img</span>
          </button>
          <span
            className="
              rounded-full bg-gold-light w-8 h-8 flex items-center justify-center
            "
          >
            {imgTracker + 1}
          </span>
          <button
            onClick={() => handleImg("next")}
            className="flex flex-row capitalize items-center justify-center font-semibold"
          >
            <span className=" hidden lg:flex">next img</span>
            <ArrowRight />{" "}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-start flex-col gap-5 lg:w-[80rem]">
        <h1>{product.name}</h1>
        <p className=" text-left">{product.description}</p>
        <div className="flex justify-start items-center flex-row gap-8 w-full">
          <h2
            className="text-5xl
          bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500"
          >
            {product.price}$
          </h2>

          {user && user.role === "ADMIN" ? (
            <Link
              href={`/dashboard/edit-product/${product.id}`}
              className="bg-gold-light ml-5 px-6 py-2 rounded-md border-2 border-gold font-bold "
            >
              Edit
            </Link>
          ) : (
            <AddToCart product_id={product.id} user_id={user && user.id} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
