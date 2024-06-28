import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterCard from "@/components/FooterCard";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FashionFusion",
  description: "Where elegance meets innovation. Discover your style with our curated collection of the latest trends, designed to inspire and empower your unique fashion journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Navbar/>
        {children}
        <FooterCard/>
        </body>
    </html>
  );
}
