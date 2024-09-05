"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import { User } from "@/types";
import { ShoppingCart } from "lucide-react";
import SignOutBtn from "./buttons/SignOut";

const Navbar = ({ user, cart }: { user: User; cart: any }) => {
  const [showHamburger, setShowHamburger] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : true
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowHamburger(false);
      } else {
        setShowHamburger(true);
      }
    };
    handleResize();
    ``;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center w-full pl-[10vw] pr-[10vw] fixed top-0 left-0 bg-red-50 h-14">
      <h3 className="font-bold text-xl md:text-3xl lg:text-4xl">YASHSTORE</h3>
      {showHamburger ? (
        <button onClick={handleHamburgerClick}>
          {isOpen ? <X /> : <Menu />}
        </button>
      ) : (
        <ul className="flex justify-end items-center flex-row gap-4 w-full text-2xl md:text-xl font-semibold">
          <li
            className="p-2 transition duration-200 
          hover:bg-red-100 hover:scale-110 hover:translate-y-1 hover:shadow-md hover:underline"
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="p-2 transition duration-200 
          hover:bg-red-100 hover:scale-110 hover:translate-y-1 hover:shadow-md hover:underline"
          >
            <Link href="/products">Products</Link>
          </li>
          {user ? (
            user.role === "ADMIN" ? (
              <>
                <li
                  className="p-2 transition duration-200 
          hover:bg-red-100 hover:scale-110 hover:translate-y-1 hover:shadow-md hover:underline"
                >
                  <Link href="/dashboard">Admin</Link>
                </li>
                <SignOutBtn />
              </>
            ) : (
              <>
                <li
                  className="p-2 transition duration-200 
          hover:bg-red-100 hover:scale-110 hover:translate-y-1 hover:shadow-md hover:underline"
                >
                  <Link href="/cart" className="center-row">
                    <ShoppingCart />
                    <span className="center-col w-6 h-6 rounded-full relative -top-3 bg-red-500 text-center text-base">
                      {cart.length}
                    </span>
                  </Link>
                </li>
                <li
                  className="p-2 transition duration-200 
          hover:bg-red-100 hover:scale-110 hover:translate-y-1 hover:shadow-md hover:underline"
                >
                  <Link href={`/orders`}>My Orders</Link>
                </li>
                <SignOutBtn />
              </>
            )
          ) : (
            <>
              <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
                <Link href="/register">Register</Link>
              </li>
              <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      )}
      {isOpen && (
        <div className="fixed top-10 left-0 w-screen h-screen bg-red-100 animate-rightToLift">
          <ul className="h-full center-col gap-10 font-bold text-xl">
            <li>
              <Link onClick={() => setIsOpen(!isOpen)} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)} href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)} href="/products">
                <ShoppingCart />
                <span className="center-col w-6 h-6 rounded-full relative -top-3 bg-red-500 text-center text-base">
                  {cart.length}
                </span>
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)} href="/products">
                My Orders
              </Link>
            </li>
            <li>
              <SignOutBtn />
            </li>
            {user ? (
              <></>
            ) : (
              <>
                <li>
                  <Link onClick={() => setIsOpen(!isOpen)} href="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(!isOpen)} href="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
