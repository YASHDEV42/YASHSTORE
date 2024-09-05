import React from "react";
import { SignOut } from "@/actions/User";

type Props = {};

const SignOutBtn = (props: Props) => {
  return (
    <form action={SignOut}>
      <button
        className="p-2 transition duration-200 border-2 border-red-50 rounded-md
          hover:bg-red-100 hover:scale-95 hover:border-red-500"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
};

export default SignOutBtn;
