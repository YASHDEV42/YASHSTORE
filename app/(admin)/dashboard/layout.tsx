import { auth } from "@/auth";
import DashboardSideMenu from "@/components/DashboardSideMenu";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";

type Props = {};

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = (await auth()) as Session | null;
  const user = session?.user as any;
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div>
      <DashboardSideMenu />
      <div className="lg:pl-[25vw] pl-0">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default layout;
