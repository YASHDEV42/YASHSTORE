"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    toast.success("Payment completed successfully");
  }, [isMounted, setIsMounted]);
  return (
    <section className="center-col gap-2">
      <h1 className=" uppercase">
        Your Payment has been completed{" "}
        <span
          className="
      bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
      "
        >
          successfully{" "}
        </span>
        🎊
      </h1>
      <p>
        in 24 hours you will receive an email with the details of your order
      </p>
      <h2 className="text-xl font-semibold">
        Amount:{" "}
        <span
          className=" font-bold
        bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
        "
        >
          {searchParams.amount}$
        </span>{" "}
        <br />
        Payment Id: {searchParams.paymentId}
      </h2>
      <br />
      <div className="center-row gap-5">
        <Link href="/orders">
          <button className="primary-btn">orders</button>
        </Link>
        <Link href="/products">
          <button className="secondary-btn">products</button>
        </Link>
      </div>
    </section>
  );
};

export default page;
