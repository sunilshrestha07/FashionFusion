import { paddingForpage } from "@/app/sizeDeclare";
import React from "react";

export default function Dressloding() {
   return (
      <>
         <div className={paddingForpage}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16 animate-pulse">
               <div className="animate-pulse w-full aspect-[9/12] rounded-lg overflow-hidden bg-gray-300 "></div>
               <div className=" animate-pulse w-full aspect-[9/12] rounded-lg overflow-hidden bg-gray-300 "></div>
               <div className=" animate-pulse w-full aspect-[9/12] rounded-lg overflow-hidden bg-gray-300 "></div>
               <div className=" animate-pulse w-full aspect-[9/12] rounded-lg overflow-hidden bg-gray-300 "></div>
            </div>
         </div>
      </>
   );
}
