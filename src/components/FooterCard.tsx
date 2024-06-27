import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterCard() {
   return (
      <div>
         <div className="">
            <div className=" w-full aspect-[10/8] sm:aspect-[16/6] lg:aspect-[16/5] relative">
               {/* <Image
                  className="w-full h-full object-cover object-center"
                  src="/images/foot.jpg"
                  alt="footerbody image"
                  width={1000}
                  height={500}
                  quality={100}
               /> */}
               <video
                  className="w-full h-full object-cover object-center"
                  controls
                  preload="metadata"
                  poster="/images/foot.jpg"
                  autoPlay={true}
                  muted={true}
                  loop={true}
               >
                  <source src="/images/nft.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
               <div className=" backdrop-brightness-50 absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-3 sm:gap-6 md:gap-10">
                  <div className=" text-2xl sm:text-3xl xl:text-5xl font-semibold font-serif flex flex-col text-center text-white">
                     Experience Comfort & Style
                  </div>
                  <div className="text-sm sm:text-base xl:text-xl font-medium text-center text-white w-11/12 sm:w-10/12">
                     At Hoodieshub, our mission is to provide our customers with
                     the best in comfort and style. We are dedicated to quality,
                     sustainability, and affordability, ensuring you get the
                     best value for your money. Shop with us and experience the
                     difference.
                  </div>
                  <div className=" font-lora flex justify-center gap-10">
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-1 sm:py-3 text-base sm:text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black ">
                        <Link href="/male">Male</Link>
                     </button>
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-1 sm:py-3 text-base sm:text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black">
                        <Link href="/male">Female</Link>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
