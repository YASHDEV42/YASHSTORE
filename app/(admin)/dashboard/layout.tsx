import DashboardSideMenu from "@/components/DashboardSideMenu";
import React from "react";

type Props = {};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <DashboardSideMenu />
      <div className="pl-[25vw]">{children}</div>
    </div>
  );
};

export default layout;
