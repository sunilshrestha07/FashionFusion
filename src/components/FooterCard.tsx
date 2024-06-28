import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterCard() {
   return (
      <div>
         <div className="">
            <div className=" w-full aspect-[10/8] sm:aspect-[16/6] lg:aspect-[16/5] relative">
               <Image
                  className="w-full h-full object-cover object-center"
                  src="/images/foot.jpg"
                  alt="footerbody image"
                  width={1000}
                  height={500}
                  quality={100}
               />
               <div className=" backdrop-brightness-50 absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-3 sm:gap-6 md:gap-10">
                  <div className=" text-2xl sm:text-3xl xl:text-5xl font-semibold font-serif flex flex-col text-center text-white">
                     Experience Comfort & Style
                  </div>
                  <div className="text-sm sm:text-base xl:text-xl font-medium text-center text-white w-11/12 sm:w-10/12">
                     At FashionFusion, our mission is to provide our customers
                     with the best in comfort and style. We are dedicated to
                     quality, sustainability, and affordability, ensuring you
                     get the best value for your money. Shop with us and
                     experience the difference.
                  </div>
                  <div className=" font-lora flex justify-center gap-10">
                     <div className="">
                        <Link href="/dress/male">
                           <button className=" bg-gray-300 text-black px-10 sm:px-12 py-1 sm:py-3 text-base sm:text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black ">
                              Male
                           </button>
                        </Link>
                     </div>
                     <div className="">
                        <Link href="/dress/female">
                           <button className=" bg-gray-300 text-black px-10 sm:px-12 py-1 sm:py-3 text-base sm:text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black">
                              Female
                           </button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className=" px-10 sm:px-28 py-10">
            <div className=" grid grid-rows-3 gap-6 sm:grid-rows-none sm:grid-cols-3">
               <div className=" col-span-1 flex flex-col gap-2 justify-center items-center sm:items-start ">
                  <p className="font-bold text-xl">FashionFusion</p>
                  <p className="font-medium text-sm md:text-base sm:w-3/4">
                     Follow us on social media and stay updated on our latest
                     collections and promotions.
                  </p>
                  <div className=" flex gap-3 mt-1">
                     <div className=" w-7 aspect-square rounded-full overflow-hidden">
                        <img
                           className="w-full h-full object-cover object-center"
                           src="/icons/tiktok.png"
                           alt=""
                        />
                     </div>
                     <div className=" w-7 aspect-square rounded-full overflow-hidden">
                        <img
                           className="w-full h-full object-cover object-center"
                           src="/icons/instagram.png"
                           alt=""
                        />
                     </div>
                     <div className=" w-7 aspect-square rounded-full overflow-hidden">
                        <img
                           className="w-full h-full object-cover object-center"
                           src="/icons/instagram.png"
                           alt=""
                        />
                     </div>
                  </div>
               </div>
               <div className="col-span-1 flex flex-col gap-2 items-center">
                  <p className="font-bold text-xl">Shop</p>
                  <p className="font-medium text-sm sm:text-base">
                     <Link href="/dress/male">Male</Link>
                  </p>
                  <p className="font-medium text-sm sm:text-base">
                     <Link href="/dress/female">Female</Link>
                  </p>
               </div>
               <div className=" col-span-1 flex flex-col gap-2 -mt-10 sm:-mt-0 items-center">
                  <p className="font-bold text-xl">About</p>
                  <p className="font-medium text-sm sm:text-base">
                     <Link href="/">Home</Link>
                  </p>
                  <p className="font-medium text-sm sm:text-base">
                     <Link href="/sale">Sale</Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
