import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/NavbarWrapper";
import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YASHSTORE",
  description: "YASHSTORE is a e-commerce website for buying products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavbarWrapper />
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
