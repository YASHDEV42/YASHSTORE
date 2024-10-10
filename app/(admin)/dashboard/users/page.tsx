import Users from "@/components/admin/Users";
import prisma from "@/lib/db";
import { User } from "@/types";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const reversedUsers: any = await prisma.user.findMany();
  const users: User[] = reversedUsers.reverse();
  return <Users users={users} />;
};

export default page;
