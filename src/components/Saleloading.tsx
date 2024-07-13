import React from "react";

export default function Saleloading() {
   return (
      <div>
         <div className="">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14 md:gap-10 lg:gap-24">
               <div className="col-span-1 bg-gray-400 animate-pulse w-full aspect-[9/12]"></div>
               <div className="col-span-1 bg-gray-400 animate-pulse w-full aspect-[9/12]"></div>
               <div className="col-span-1 bg-gray-400 animate-pulse w-full aspect-[9/12]"></div>
            </div>
         </div>
      </div>
   );
}
