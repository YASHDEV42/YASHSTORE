import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany();
  const categories = await prisma.category.findMany();

  return (
    <section className="center-col gap-4 mb-24">
      <h1 className="border-b-4 border-gold mt-32">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="card">
          <h2 className="text-2xl font-semibold stroke-gold stroke-2">Users</h2>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold stroke-gold stroke-2">
            Products
          </h2>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold stroke-gold stroke-2">
            Orders
          </h2>
          <p>{orders.length}</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold stroke-gold stroke-2">
            Categories
          </h2>
          <p>{categories.length}</p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 w-full mt-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold border-b-2 border-red-200 w-full pb-2">
          Pending Orders :
        </h2>
        <div>
          {orders && orders.length > 0 ? (
            <>
              {[...orders]
                .sort((a, b) => {
                  const dateDifference =
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime();

                  if (dateDifference === 0) {
                    return a.id.localeCompare(b.id);
                  }

                  return dateDifference;
                })
                .map(
                  (order, index) =>
                    order.status == "PENDING" && (
                      <div
                        key={order.id}
                        className="flex justify-start items-center flex-row gap-10 w-full pr-6 pt-1"
                      >
                        <h2 className="text-xl w-72">
                          user name :{" "}
                          {
                            users.find((user) => user.id === order.user_id)
                              ?.name
                          }
                        </h2>
                        <h2>
                          <span
                            className="font-bold text-md
                        bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500
                        "
                          >
                            {order.status}
                          </span>
                        </h2>
                        <span
                          className="text-xl font-bold 
                      bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
                      "
                        >
                          {order.total_price}$
                        </span>
                        <h2 className="italic w-64">
                          {order.created_at.toUTCString()}
                        </h2>{" "}
                      </div>
                    )
                )}
              <Link href={"/dashboard/orders"}>
                <button className="secondary-btn mt-5">View All</button>
              </Link>
            </>
          ) : (
            <p>No Orders yet 🕐</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 w-full mt-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold border-b-2 border-red-200 w-full pb-2">
          New Users :
        </h2>
        <div>
          {users &&
            (() => {
              const sortedUsers = [...users].sort((a, b) => {
                const dateDifference =
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime();

                if (dateDifference === 0) {
                  return a.id.localeCompare(b.id);
                }

                return dateDifference;
              });

              return sortedUsers.slice(0, 3).map((user) => (
                <>
                  <div
                    key={user.id}
                    className="flex justify-between items-start flex-row gap-10 w-full"
                  >
                    <h2 className="text-2xl">{user.name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                </>
              ));
            })()}
          <Link href={"/dashboard/users"}>
            <button className="secondary-btn mt-5">View All</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
