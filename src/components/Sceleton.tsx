import { paddingForpage } from "@/app/sizeDeclare";
import React from "react";


export default function Sceleton() {
   return (
      <>
         <div className={paddingForpage}>
            <div className=" animate-pulse p-4 grid grid-rows-2 sm:grid-rows-none sm:grid-cols-5 gap-12  w-full">
               <div className=" bg-slate-300 row-span-1 sm:col-span-2 w-full aspect-[9/12] sm:w-10/12 xl:aspect-[9/11]"></div>

               <div className="row-span-1 sm:col-span-3 flex flex-col justify-around gap-4">
                  <div className=" flex flex-col gap-6">
                     <div className="mb-1 h-7 sm:h-12 w-[35%] rounded-lg bg-slate-300 text-lg"></div>
                     <div className="w-full aspect-[16/3] rounded-lg bg-slate-300 text-sm"></div>
                     <div className="h-7 sm:h-10 w-[30%] rounded-lg bg-slate-300 text-sm"></div>
                  </div>
                  <div className=" flex gap-10">
                     <div className="h-12 w-[50%] rounded-lg bg-slate-300 text-sm"></div>
                     <div className="h-12 w-[50%] rounded-lg bg-slate-300 text-sm"></div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
