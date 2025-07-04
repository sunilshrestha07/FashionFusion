"use client";

import { paddingForpage } from "../app/sizeDeclare";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LowerHeroSection() {
   return (
      <>
         <div className="bg-orange-100">
            <div
               className={`grid  sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 ${paddingForpage} w-full`}
            >
               <div className=" col-span-1  w-full aspect-square  flex justify-center items-center">
                  <div className=" flex justify-center items-center ">
                     <div className="w-1/2 aspect-[9/13] rounded-3xl  relative z-10  ">
                        <div className="w-full h-full rounded-3xl overflow-hidden z-50">
                           <Image
                              className="w-full h-full object-cover object-center z-50"
                              src="/images/cinematic.jpg"
                              alt="Model image"
                              width={400}
                              height={500}
                              quality={80}
                           />
                        </div>
                        <motion.div
                           initial={{
                              translateX: -53,
                           }}
                           whileInView={{
                              opacity: 1,
                              translateX: 0,
                              transition: { delay: 0.2, duration: 0.5 },
                           }}
                           viewport={{ once: false, amount: 0 }}
                           className="w-2/3 aspect-[9/12] rounded-3xl overflow-hidden absolute top-[16%] -left-[45%] -z-10"
                        >
                           <Image
                              className="w-full h-full object-cover object-center"
                              src="/images/men6.jpg"
                              alt="Model image"
                              width={300}
                              height={400}
                              quality={60}
                           />
                        </motion.div>
                        <motion.div
                           initial={{
                              translateX: 53,
                           }}
                           whileInView={{
                              opacity: 1,
                              translateX: 0,
                              transition: { delay: 0.2, duration: 0.5 },
                           }}
                           viewport={{ once: false, amount: 0 }}
                           className="w-1/2 aspect-[9/12] rounded-3xl overflow-hidden absolute -bottom-[16%] -right-[32%] -z-10"
                        >
                           <Image
                              className="w-full h-full object-cover object-center z-0"
                              src="/images/men3.jpg"
                              alt="Model image"
                              width={300}
                              height={500}
                              quality={60}
                           />
                        </motion.div>
                        <motion.div
                           initial={{
                              translateX: 53,
                           }}
                           whileInView={{
                              opacity: 1,
                              translateX: 0,
                              transition: { delay: 0.2, duration: 0.5 },
                           }}
                           viewport={{ once: false, amount: 0 }}
                           className="w-1/2 aspect-[9/12] rounded-3xl overflow-hidden absolute -top-[16%] -right-[30%] "
                        >
                           <Image
                              className="w-full h-full object-cover object-center z-0"
                              src="/images/women1.jpg"
                              alt="Model image"
                              width={300}
                              height={500}
                              quality={60}
                           />
                        </motion.div>
                     </div>
                  </div>
               </div>

               <div className=" col-span-1 flex flex-col justify-center items-start gap-5  w-full ">
                  <div className=" text-4xl sm:text-3xl xl:text-5xl font-semibold font-serif flex flex-col gap-1 w-full ">
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
                  <div className="">
                     <Link href="/dress">
                        <div className="">
                           <button
                              type="submit"
                              className=" bg-black text-white hover:text-black hover:bg-white outline outline-1 outline-black text-base lg:text-xl font-semibold px-7 py-2  "
                           >
                              Take a look
                           </button>
                        </div>
                     </Link>
                  </div>
               </div>
            </div>

            <div className={`sm:mt-5 ${paddingForpage} `}>
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
