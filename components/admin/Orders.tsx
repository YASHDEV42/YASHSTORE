"use client";
import { Order } from "@/types";
import { User } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Orders = ({ orders, users }: { orders: Order[]; users: User[] }) => {
  const [allOrders, setAllOrders] = useState<Order[]>(orders);
  const [query, setQuery] = useState<string>("");
  const fillterOrders = allOrders
    .map((order) => {
      const user = users.find((u) => u.id === order.user_id);
      return { ...order, user };
    })
    .filter((order) => {
      return order.user?.name.toLowerCase().includes(query.toLowerCase());
    });
  return (
    <div className="w-full px-16 mt-24 ">
      <div className="mb-5">
        <h1 className="mb-4">Orders</h1>
        <label htmlFor="">Search :</label>
        <input
          className="ml-3 text-lg font-semibold w-64 h-10
           border-2 border-red-300 rounded-md px-2
           focus:outline-none focus:ring-2 focus:ring-red-300
           focus:border-transparent"
          type="text"
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {fillterOrders.length === 0 ? (
        <h2 className="text-4xl text-center mt-10">no orders found</h2>
      ) : (
        fillterOrders.map((order) => {
          return (
            <Link
              href={`/dashboard/orders/${order.id}`}
              key={order.id}
              className="bg-red-100 h-16 w-full flex justify-between items-center flex-row mb-3 px-4 rounded-md
              hover:bg-red-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h2 className="text-xl w-52 font-semibold">
                User Name :{" "}
                {users.find((user) => user.id === order.user_id)?.name}
              </h2>
              <h3 className="text-xl font-semibold">
                Total Price :{" "}
                <span
                  className="text-xl font-bold 
                bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
                "
                >
                  {order.total_price}$
                </span>
              </h3>
              <h2 className="text-lg font-semibold">
                {/* status: */}
                {order.status === "PENDING" && (
                  <span
                    className="text-lg  font-bold
                bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500
                "
                  >
                    {order.status}
                  </span>
                )}
                {order.status === "CANCELLED" && (
                  <span
                    className="text-lg  font-bold
                bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-red-500
                "
                  >
                    {order.status}
                  </span>
                )}
                {order.status === "PROCESSING" && (
                  <span
                    className="text-lg  font-bold
                bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-yellow-500
                "
                  >
                    {order.status}
                  </span>
                )}
                {order.status === "COMPLETED" && (
                  <span
                    className="text-lg  font-bold
                bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
                "
                  >
                    {order.status}
                  </span>
                )}
              </h2>{" "}
              <h3 className="italic">
                Created : {order.created_at.toUTCString()}
              </h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Orders;
