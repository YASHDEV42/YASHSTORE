"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowBigDown,
  ArrowBigRightDash,
  Cross,
  ShoppingBasket,
} from "lucide-react";
import { BadgePlus } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Shapes } from "lucide-react";
import { BadgeDollarSign } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Users } from "lucide-react";

type Props = {};

const DashboardSideMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  console.log(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 1024) {
        setShowHamburger(false);
        isOpen && setIsOpen(false);
      } else {
        setShowHamburger(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      {showHamburger ? (
        <>
          <div className="h-screen flex items-center justify-center fixed top-0 left-3">
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <ArrowBigRightDash
                size={45}
                className="animate-arrowFloating bg-gold-middle p-1 rounded-full"
              />
            </button>
          </div>
        </>
      ) : (
        <div className=" min-h-screen w-1/4 bg-gold-lightest  lg:left-0 lg:top-14 pl-[10vw] hidden lg:fixed lg:block">
          <ul className="w-full bg-gradient-to-r from-gold-lightest to-gold-light h-screen center-col gap-5">
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
      )}
      {isOpen ? (
        <div className=" min-h-screen w-3/4 bg-gold-lightest left-0 top-14 pl-[10vw] fixed">
          <ul className="w-full bg-gradient-to-r from-gold-lightest to-gold-light h-screen center-col gap-5">
            <Cross
              size={30}
              className="inline mr-3 rotate-45 cursor-pointer absolute top-4 right-4"
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <Link
              href={"/dashboard"}
              onClick={() => setIsOpen((prev) => !prev)}
              className="side-link"
            >
              <span>
                <LayoutDashboard className="inline mr-3" />
                <li className="inline">Dashboard</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
            <Link
              href={"/dashboard/products"}
              onClick={() => setIsOpen((prev) => !prev)}
              className="side-link"
            >
              <span>
                <ShoppingBasket className="inline mr-3" />
                <li className="inline">Products</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
            <Link
              className="side-link"
              onClick={() => setIsOpen((prev) => !prev)}
              href="/dashboard/create-product"
            >
              <span>
                <BadgePlus className="inline mr-3" />
                <li className="inline">Create Products</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
            <Link
              className="side-link"
              onClick={() => setIsOpen((prev) => !prev)}
              href="/dashboard/categories"
            >
              <span>
                <Shapes className="inline mr-3" />
                <li className="inline">Categories</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
            <Link
              className="side-link"
              onClick={() => setIsOpen((prev) => !prev)}
              href="/dashboard/users"
            >
              <span>
                <Users className="inline mr-3" />
                <li className="inline">Users</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
            <Link
              className="side-link"
              onClick={() => setIsOpen((prev) => !prev)}
              href="/dashboard/orders"
            >
              <span>
                <BadgeDollarSign className="inline mr-3" />
                <li className="inline">Orders</li>
              </span>
              <ChevronRight className="inline" />
            </Link>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default DashboardSideMenu;
