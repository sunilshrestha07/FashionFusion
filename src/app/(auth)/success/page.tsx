import Link from "next/link";
import React from "react";

export default function Page() {
   return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-white ">
         <div className="w-10/12 md:w-1/2 xl:w-1/3 aspect-video bg-gray-100 flex flex-col justify-center items-center py-5">
            <div className=" ">
               <img
                  className="w-16 sm:w-24 aspect-square object-contain "
                  src="/icons/check.png"
                  alt=""
               />
            </div>
            <div className=" text-center flex flex-col gap-5">
               <p className="  text-green-600 font-bold">Success</p>
               <p className=" font-semibold text-2xl">
                  Your Order is confirmed
               </p>
               <div className="">
                  <Link href="/dress">
                     <p className=" bg-black hover:bg-white text-white hover:text-black px-6 py-2 rounded-md font-semibold outline-1 outline cursor-pointer">
                        Continue shoping
                     </p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
