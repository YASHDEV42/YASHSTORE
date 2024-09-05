"use client";
import Link from "next/link";
import React from "react";
import { ShoppingBasket } from "lucide-react";
import { BadgePlus } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Shapes } from "lucide-react";
import { BadgeDollarSign } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Users } from "lucide-react";

type Props = {};

const DashboardSideMenu = (props: Props) => {
  return (
    <div className=" min-h-screen w-1/4 bg-red-200 fixed left-0 top-14 pl-[10vw]">
      <ul className="w-full bg-gradient-to-r from-red-200 to-red-50 h-screen center-col gap-5">
        <Link href={"/dashboard"} className="side-link">
          <span>
            <LayoutDashboard className="inline mr-3" />
            <li className="inline">Dashboard</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
        <Link href={"/dashboard/products"} className="side-link">
          <span>
            <ShoppingBasket className="inline mr-3" />
            <li className="inline">Products</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
        <Link className="side-link" href="/dashboard/create-product">
          <span>
            <BadgePlus className="inline mr-3" />
            <li className="inline">Create Products</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
        <Link className="side-link" href="/dashboard/categories">
          <span>
            <Shapes className="inline mr-3" />
            <li className="inline">Categories</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
        <Link className="side-link" href="/dashboard/users">
          <span>
            <Users className="inline mr-3" />
            <li className="inline">Users</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
        <Link className="side-link" href="/dashboard/orders">
          <span>
            <BadgeDollarSign className="inline mr-3" />
            <li className="inline">Orders</li>
          </span>
          <ChevronRight className="inline" />
        </Link>
      </ul>
    </div>
  );
};

export default DashboardSideMenu;
