"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const Register = async (prevState: FormData, formState: FormData) => {
  const name = formState.get("name") as string;
  const email = formState.get("email") as string;
  const password = formState.get("password") as string;
  const confirmPassword = formState.get("confirmPassword") as string;

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    return { message: "Please fill in all fields" };
  }
  if (password.length < 6) {
    return { message: "Password must be at least 6 characters" };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { message: "User already exists" };
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone_number: 0,
      },
    });
    console.log(user);
  } catch (error) {
    return { message: "Something went wrong" };
  }

  redirect("/");
};

const Login = async (prevState: FormData, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { message: "Please fill in all fields" };
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "User not found!" };
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return { message: "Password incorrect!" };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};

export { Register, Login };
