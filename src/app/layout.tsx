"use client";

import { Quicksand } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterCard from "@/components/FooterCard";
import ReduxProvider from "./redux/reduxProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const pathname = usePathname();
   const hideFooterRoutes = ["/login", "/signup", "/verify"];

   return (
      <html lang="en">
         <body className={quicksand.className}>
            <ReduxProvider>
               <Navbar />
               {children}
               {!hideFooterRoutes.includes(pathname) && <FooterCard />}
               <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="colored"
               />
            </ReduxProvider>
         </body>
      </html>
   );
}
