import ProductDetail from "@/components/pages/ProductDetail";
import prisma from "@/lib/db";
import { Product } from "@/types";
import React from "react";

type Props = {};

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const product = (await prisma.product.findUnique({
    where: {
      id: id,
    },
  })) as any as Product;
  console.log("product", product);
  console.log("id", id);

  return <ProductDetail product={product} />;
};

export default page;
