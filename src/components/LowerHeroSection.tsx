import { paddingForpage } from "../app/sizeDeclare";
import Image from "next/image";
import React from "react";

export default function LowerHeroSection() {
   return (
      <>
         <div className="bg-gray-100">
            <div className={`grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 ${paddingForpage}`}>
               <div className=" col-span-1 w-full aspect-square ">
                  <Image
                     className="w-full h-full object-cover object-top"
                     src="/images/model.jpg"
                     alt="Model image"
                     width={1000}
                     height={1000}
                     quality={100}
                  />
               </div>
               <div className=" col-span-1 flex flex-col justify-center items-start gap-5">
                  <div className=" text-4xl sm:text-3xl xl:text-5xl font-semibold font-serif flex flex-col gap-1">
                     <p>Premium</p>
                     <p>Quality Hoodies</p>
                     <p>for All Seasons</p>
                  </div>
                  <div className="font-medium sm:text-sm md:text-base xl:text-xl">
                    <p>At FashionFusion, we understand the importance of comfort and style, especially when it comes to style. That’s why we offer a wide range of premium quality colthes that are designed to meet your style and needs. Whether youre looking for a winter or summer clothes, we have got you covered.</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
