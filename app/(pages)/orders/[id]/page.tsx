import prisma from "@/lib/db";
import React from "react";
import SingleOrder from "./SingleOrder";
import { Order } from "@/types";

type Props = {};

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const order = (await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      products: true,
    },
  })) as unknown as Order;
  console.log(
    "***********************************",
    order.products[0].image_url[0]
  );

  return <SingleOrder order={order} />;
};

export default page;
