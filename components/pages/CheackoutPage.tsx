"use client";
import React, { useEffect } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Cart, Product, User } from "@/types";
import toast from "react-hot-toast";

type Props = {};

const CheackoutPage = ({
  amount,
  products,
  user,
  cart,
}: {
  amount: number;
  products: Product[];
  user: User;
  cart: Cart[];
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [paymentId, setPaymentId] = React.useState<string>("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, products, user, cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
        setPaymentId(data.paymentId);
      });
  }, [amount, products, user, cart]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastLoading = toast.loading("Processing payment...");
    if (!stripe || !elements) return;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      toast.dismiss(toastLoading);
      toast.error("Payment failed");
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${
          amount / 100
        }&paymentId=${paymentId}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      toast.dismiss(toastLoading);
      toast.error("Payment failed");
      return;
    }

    setLoading(false);
    toast.dismiss(toastLoading);
    toast.error("something went wrong");
  };
  if (!clientSecret) {
    return (
      <div className="center-col h-screen w-screen animate-ping">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <section className="center-col">
      <h1 className=" capitalize">pay securely :</h1>
      <br />
      <hr className="w-full" />
      <br />
      <form onSubmit={handleSubmit} className="center-col gap-5">
        {clientSecret && (
          <>
            <PaymentElement />
            {loading ? (
              <button disabled className="primary-btn opacity-50">
                loading...
              </button>
            ) : (
              <button className="primary-btn">Pay ${amount / 100}</button>
            )}
          </>
        )}
      </form>
    </section>
  );
};

export default CheackoutPage;
