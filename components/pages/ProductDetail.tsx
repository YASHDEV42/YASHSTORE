import { Product } from "@/types";
import Image from "next/image";
import React from "react";

type Props = {};

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <section>
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <p>{product.description}</p>
      <Image
        src={product.image_url}
        alt={product.name}
        width={300}
        height={300}
      />
    </section>
  );
};

export default ProductDetail;
