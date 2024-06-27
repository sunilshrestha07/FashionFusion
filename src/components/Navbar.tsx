"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
   const pathname =usePathname();
   const menu = [
      { name: "Home", href: "/" },
      { name: "Sales", href: "/sales" },
      { name: "Male", href: "/male" },
      { name: "Female", href: "/female" },
   ];

   const handelHamClick = () =>{
      setIsMenuActive(!isMenuActive);
   }

   return (
      <nav className="px-4 py-2 sm:px-5 sm:py-2 md:px-10 md:py-3 lg:px-24 lg:py-5">
         <div className="grid grid-cols-4 sm:grid-cols-8 items-center">
            {/* logo section */}
            <div className="col-span-2 ">
               <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl xl:text-4xl">
                  FashionFusion
               </h1>
            </div>

            {/* navlinks section */}
            <div className="sm:col-span-5   gap-8 font-semibold text-xs ml-5 sm:ml-10 xl:ml-0 hidden sm:flex ">
               {menu.map((item, index) => (
                  <div
                     className={`navlinks font-semibold text-sm sm:text-base md:text-xl xl:text-2xl hover:text-black transition ease-in-out duration-300 text-gray-600 ${
                        pathname === item.href ? "text-black" : ""
                     }`}
                     key={index}
                  >
                     <Link
                        href={item.href}
                        className={
                           pathname === item.href ? "active text-black" : ""
                        }
                     >
                        {item.name}
                     </Link>
                  </div>
               ))}
            </div>

            {/* profile and cart section */}
            <div className="flex gap-6 sm:gap-8 col-span-2 sm:col-span-1 items-center w-full h-full  justify-end">
               <div className="w-6  xl:w-8 aspect-square rounded-full overflow-hidden object-cover">
                  <img
                     className="w-full h-full object-cover object-center"
                     src="/icons/bag.png"
                     alt="Bag"
                  />
               </div>
               <div className="w-6  xl:w-8 aspect-square rounded-full overflow-hidden object-cover">
                  <img
                     className="w-full h-full object-cover object-center  "
                     src="/icons/user.png"
                     alt="User"
                  />
               </div>

               {/* hamburger menu */}
               <div className="w-6 xl:w-8 aspect-square  object-cover sm:hidden relative">
                  <img src="/icons/menu.png" alt="" onClick={handelHamClick} />
                  <div className={`absolute top-7 right-0 bg-white w-screen aspect-[9/16.75] flex justify-center transition ease-in-out duration-300 ${isMenuActive ? "block" : "hidden"}`}>
                     <div className=" mt-20 flex flex-col gap-10 ">
                        {menu.map((item, index) => (
                           <div onClick={handelHamClick}
                              className={`navlinks font-semibold w-full text-4xl hover:text-black transition ease-in-out duration-300 text-gray-600 ml-8 ${
                                 pathname === item.href ? "text-black" : ""
                              }`}
                              key={index}
                           >
                              <Link
                                 href={item.href}
                              >
                                 {item.name}
                              </Link>
                              
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
}