import Link from "next/link";
import React from "react";

type Props = {};

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <section className="center-col gap-2">
      <h1>Your Payment has been completed successfully 🎊</h1>
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
          <button className="secondary-btn">keep shopping</button>
        </Link>
      </div>
    </section>
  );
};

export default page;
