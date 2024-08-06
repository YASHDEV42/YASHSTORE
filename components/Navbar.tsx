"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import { User } from "@/types";
import { ShoppingCart } from "lucide-react";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  console.log("user in navbar", user);

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center w-full pl-[10vw] pr-[10vw] fixed top-0 left-0 bg-red-100 h-14">
      <h3 className="font-bold text-xl md:text-3xl lg:text-4xl">YASHSTOCK</h3>
      {showHamburger ? (
        <button onClick={handleHamburgerClick}>
          {isOpen ? <X /> : <Menu />}
        </button>
      ) : (
        <ul className="flex justify-end items-center flex-row gap-2 w-full text-2xl md:text-xl font-semibold">
          <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
            <Link href="/products">Products</Link>
          </li>
          {user ? (
            user.role === "ADMIN" ? (
              <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
                <Link href="/dashboard">Admin</Link>
              </li>
            ) : (
              <>
                <li className="hover:scale-105 transition duration-200 hover:bg-red-200 p-2">
                  <Link href="/cart">
                    <ShoppingCart />
                    <span className="center-col w-6 h-6 rounded-full bg-red-500 absolute -top-1 -right-1 text-center text-base">
                      5
                    </span>
                  </Link>
                </li>
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
