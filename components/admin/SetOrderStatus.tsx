"use client";
import { setOrderStatusFunction } from "@/actions/Products";
import { Order } from "@/types";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
type Props = {};

const SetOrderStatus = ({ order }: { order: Order }) => {
  const [status, setStatus] = useState(order.status);

  const handleValueChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatus(value);
    try {
      const toastLoading = toast.loading("Updating order status...");
      await setOrderStatusFunction(order.id, value);
      toast.dismiss(toastLoading);
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="inline-block ml-5">
      <input type="text" hidden value={order.id} />
      <select
        defaultValue={status}
        onChange={handleValueChange}
        className=" border-2 border-gold rounded-md px-4 focus:outline-gold-dark focus:ring-2 focus:ring-gold focus:border-transparent"
      >
        <option value="PENDING">Pending</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="PROCESSING">Processing</option>
        <option value="DELIVERING">Delivering</option>
        <option value="SHIPPED">Shipped</option>
        <option value="COMPLETED">Completed</option>
        <option value="REFUNDED">Refunded</option>
      </select>
    </form>
  );
};

export default SetOrderStatus;
