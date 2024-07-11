"use client";

import { paddingForpage } from "@/app/sizeDeclare";
import Crousel from "@/components/Crousel";
import { getDressInterface } from "@/types/declareTypes";
import { blurDataUrl } from "@/utils/BlurDataUrl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dress() {
   const [allData,setAllData]=useState<getDressInterface[]>([])

   const fetchData = async () => {
      const res = await fetch("/api/dress");
      const data = await res.json();
      setAllData(data.dress);
   }

   
   useEffect(() => {
      fetchData();
   }, [])

   const filledStarSrc = "/icons/ystar.png";
   const emptyStarSrc = "/icons/star.png";

   const generateStars = (rating: number) => {
      const starCount = Math.floor(rating);
      const stars = [];
      for (let i = 0; i < 5; i++) {
         stars.push(
            <Image
               width={20}
               height={20}
               key={i}
               src={i < starCount ? filledStarSrc : emptyStarSrc}
               alt="Star"
               className="h-4 aspect-square object-contain"
            />
         );
      }
      return stars;
   };

   function ScrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
      useEffect(() => {
        ScrollToTop();
      }, []);
   return (
      <>
         <div className="">
            <div className="">
               <Crousel />
            </div>
            <div className={paddingForpage}>
               <div className="">
                  <div className=" ">
                     <div className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
                        {allData.length > 0 && allData.map((item) => (
                           <div
                              className=" col-span-1 shadow-product rounded-lg"
                              key={item._id}
                           >
                              <Link href={`/dress/${item._id}`}>
                                 <div className=" w-full bg-gray-100 flex flex-col p-2 rounded-lg">
                                    <div className=" w-full aspect-[9/11] rounded-lg overflow-hidden">
                                       <Image
                                          className="w-full h-full object-cover object-top hover:scale-110 transition ease-in-out duration-300"
                                          src={item.image}
                                          alt={item.name}
                                          width={400}
                                          height={500}
                                          quality={70}
                                          placeholder="blur"
                                          blurDataURL={blurDataUrl}
                                       />
                                    </div>
                                    <div className=" font-semibold text-xl opacity-90 truncate mb-3 flex flex-col gap-1">
                                       <p>{item.name}</p>
                                       <div className=" flex justify-between">
                                          <div className="">
                                             <div className=" flex gap-4 items-center">
                                                <div className=" flex gap-1">
                                                   {generateStars(item.rating)}
                                                </div>
                                                <p>{item.rating}</p>
                                             </div>
                                          </div>
                                          <p className="">{item.price}</p>
                                       </div>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
