"use client";

import { Quicksand } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterCard from "@/components/FooterCard";
import ReduxProvider from "./redux/reduxProvider";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const hideFooterRoutes = ["/login", "/signup"]; 

  return (
    <html lang="en">
      <body className={quicksand.className}>
        <ReduxProvider>
          <Navbar />
          {children}
          {!hideFooterRoutes.includes(pathname) && <FooterCard />}
        </ReduxProvider>
      </body>
    </html>
  );
}
