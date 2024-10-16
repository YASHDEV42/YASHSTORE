"use client";
import { User } from "@/types";
import React, { useState } from "react";

type Props = {};

const Users = ({ users }: { users: User[] }) => {
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [query, setQuery] = useState<string>("");
  const fillterUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="w-full px-16 mt-24 ">
      <div className="mb-5">
        <h1 className="mb-4">Users</h1>
        <label htmlFor="">Search :</label>
        <input
          className="ml-3 text-lg font-semibold w-64 h-10
           border-2 border-gold-middle rounded-md px-4
           focus:outline-none focus:ring-2 focus:ring-gold
           focus:border-transparent"
          type="text"
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {fillterUsers.length === 0 ? (
        <h2 className="text-4xl text-center mt-10">no prodcts found</h2>
      ) : (
        fillterUsers.map((user) => {
          return (
            <div
              key={user.id}
              className="bg-gold-light h-24 lg:h-16 w-full flex justify-between items-center flex-col lg:flex-row mb-3 px-4 py-1 lg:py-0 rounded-md
              hover:bg-gold-middle hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center flex-col lg:flex-row w-1/2">
                <span className="flex justify-center items-center flex-row gap-3">
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                </span>
                <h3 className="text-lg font-bold">{user.email}</h3>
              </div>
              <h3 className="italic">
                created : {user.created_at.toUTCString()}
              </h3>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Users;
