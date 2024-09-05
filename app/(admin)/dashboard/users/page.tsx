import Users from "@/components/admin/Users";
import prisma from "@/lib/db";
import { User } from "@/types";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const users: any = await prisma.user.findMany();
  return <Users users={users} />;
};

export default page;
