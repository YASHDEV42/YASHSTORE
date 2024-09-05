import { auth } from "@/auth";
import React from "react";
import dynamic from "next/dynamic";
import { User } from "@/types";
import prisma from "@/lib/db";
interface Session {
  user: any;
}

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

type Props = {};

const NavbarWrapper = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user || null;
  const cart = await prisma.cart.findMany({ where: { user_id: user?.id } });

  return <DynamicNavbar user={user} cart={cart} />;
};

export default NavbarWrapper;
