import Orders from "@/components/admin/Orders";
import prisma from "@/lib/db";
import { Order } from "@/types";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const orders: any = await prisma.order.findMany();
  const users: any = await prisma.user.findMany();
  return <Orders orders={orders} users={users} />;
};

export default page;
