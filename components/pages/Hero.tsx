"use client";
import Link from "next/link";
import { User } from "@/types";
import gsap from "gsap";
import { useEffect } from "react";

interface HeroProps {
  user: User | null;
}
const Hero: React.FC<HeroProps> = ({ user }) => {
  return (
    <section>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="-z-10 absolute top-1/4 right-2/3
          w-96 h-96 transform  rotate-45  scale-150 
        "
      >
        <path
          fill="#FFD6A5"
          d="M42,-68.6C53.1,-66.4,59.7,-52.3,63,-38.9C66.2,-25.5,66,-12.8,65.6,-0.2C65.3,12.3,64.7,24.7,58,32.1C51.3,39.5,38.5,42.1,27.8,49.7C17.2,57.2,8.6,69.9,-3.2,75.5C-15,81,-30,79.5,-37.4,70C-44.8,60.5,-44.6,43.1,-49.6,30.1C-54.7,17.1,-65,8.5,-70.2,-3C-75.4,-14.6,-75.5,-29.1,-69.1,-39.7C-62.7,-50.3,-49.7,-57,-37.1,-58.4C-24.5,-59.8,-12.3,-55.9,1.6,-58.7C15.5,-61.5,30.9,-70.9,42,-68.6Z"
          transform="translate(100 100)"
        />
      </svg>
      {user ? (
        user.role !== "ADMIN" ? (
          <div className="center-col h-screen gap-2">
            <h1 className="">Welcome back, {user.name}!</h1>
            <p>The best place to buy any product</p>
            <div className="mt-2">
              <button className="primary-btn mr-4">
                <Link href="/products">Browse</Link>
              </button>
              <button className="secondary-btn">
                <Link href="/cart">See Cart</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="center-col h-screen gap-2">
            <h1>
              Welcome back,{" "}
              <span
                className="
              bg-gradient-to-r from-red-950 to-red-800 text-transparent bg-clip-text
            "
              >
                {user.name}
              </span>
            </h1>
            <p>The best place to buy any product</p>
            <div className="mt-2">
              <button className="primary-btn mr-4">
                <Link href="/products">Browse</Link>
              </button>
              <button className="secondary-btn">
                <Link href="/dashboard">Dashboard</Link>
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="center-col h-screen gap-2">
          <h1>Welcome in YASHSTORE</h1>
          <p>The best place to buy any tech product</p>
          <div className="mt-2">
            <button
              onMouseOver={(e) => e.currentTarget.classList.add("hover-this")}
              onMouseOut={(e) => e.currentTarget.classList.remove("hover-this")}
              className="primary-btn mr-4"
            >
              <Link href="/products">Browse</Link>
            </button>
            <button className="secondary-btn">
              <Link href="/register">Sign Up</Link>
            </button>
          </div>
        </div>
      )}
      <span
        className="w-full h-80 absolute left-0 -bottom-64 rounded-b-full
        bg-gradient-to-b from-white to-[#FFD6A5] -z-30
      "
      ></span>
    </section>
  );
};

export default Hero;
