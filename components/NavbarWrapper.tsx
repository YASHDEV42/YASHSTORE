import { auth } from "@/auth";
import React from "react";
import dynamic from "next/dynamic";
import { User } from "@/types";
interface Session {
  user: User | null;
}

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

type Props = {};

const NavbarWrapper = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user || null;

  return <DynamicNavbar user={user || null} />;
};

export default NavbarWrapper;
