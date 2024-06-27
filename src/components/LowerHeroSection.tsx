import { paddingForpage } from "../app/sizeDeclare";
import Image from "next/image";
import React from "react";

export default function LowerHeroSection() {
   return (
      <>
         <div className="bg-gray-100">
            <div
               className={`grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 ${paddingForpage}`}
            >
               <div className=" col-span-1 w-full aspect-square flex items-center justify-center ">
                  <Image
                     className="w-full h-full object-cover object-top"
                     src="/images/model.jpg"
                     alt="Model image"
                     width={400}
                     height={400}
                     quality={100}
                  />
               </div>
               <div className=" col-span-1 flex flex-col justify-center items-start gap-5">
                  <div className=" text-4xl sm:text-3xl xl:text-5xl font-semibold font-serif flex flex-col gap-1">
                     <p>Premium</p>
                     <p>Quality Clothes</p>
                     <p>for All Seasons</p>
                  </div>
                  <div className="font-medium sm:text-sm md:text-base xl:text-xl">
                     <p>
                        At FashionFusion, we understand the importance of
                        comfort and style, especially when it comes to style.
                        That’s why we offer a wide range of premium quality
                        colthes that are designed to meet your style and needs.
                        Whether youre looking for a winter or summer clothes, we
                        have got you covered.
                     </p>
                  </div>
               </div>
            </div>

            <div className={`sm:mt-5 ${paddingForpage}`}>
               <div className="flex flex-col gap-3 mb-16">
                  <div className="text-4xl sm:text-3xl xl:text-4xl font-semibold font-serif flex flex-col text-center">
                     <p>Experience the Best in Comfort & Style</p>
                  </div>
                  <div className=" font-medium sm:text-sm md:text-base xl:text-xl text-center">
                     <p>
                        Our clothes are made from premium quality materials that
                        are designed to keep you comfortable all day long. From
                        the softness of the fabric to the durability of the
                        stitching, every detail is carefully considered to
                        ensure you enjoy the best in comfort and style.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
