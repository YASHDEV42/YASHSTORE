import { auth } from "@/auth";
import CheackoutPageWrapper from "@/components/CheackoutPageWrapper";
import prisma from "@/lib/db";
import { Session } from "next-auth";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user as any;
  const cart: any = await prisma.cart.findMany({
    where: { user_id: user?.id },
  });

  const products_id = cart.map((item: any) => item.product_id);
  const products: any = await prisma.product.findMany({
    where: {
      id: {
        in: products_id,
      },
    },
  });
  const totalPrice: number = products.reduce(
    (acc: any, item: any) => acc + item?.price,
    0
  );

  return (
    <CheackoutPageWrapper
      amount={totalPrice * 100}
      products={products}
      user={user}
      cart={cart}
    />
  );
};

export default page;
