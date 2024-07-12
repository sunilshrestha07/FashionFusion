"use client";

import { paddingForpage } from "@/app/sizeDeclare";
import { getDressInterface } from "@/types/declareTypes";
import { blurDataUrl } from "@/utils/BlurDataUrl";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Saleloading from "./Saleloading";

export default function Sale() {
   const [allData, setAllData] = useState<getDressInterface[]>([]);
   const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

   //fetch data that are in sale
   const fetchSaleItems = async () => {
      setIsDataLoading(true);
      try {
         const res = await axios.get("/api/dress");
         if (res.status === 200 && res.data) {
            console.log("Fetched data:", res.data.dress);
            let data = res.data.dress;
            const saleItems = data.filter(
               (item: getDressInterface) => item.sale === true
            );
            setIsDataLoading(false);
            setAllData(saleItems);
         }
      } catch (error) {
         console.log("Error fetching data: ", error);
      }
   };

   useEffect(() => {
      fetchSaleItems();
   }, []);

   if (!allData) {
      return (
         <div>
            <div className="">
               <div className=" animate-pulse w-full h-28 bg-slate-200"></div>
            </div>
         </div>
      );
   }

   return (
      <div className={`${paddingForpage} bg-blue-50`}>
         <div>
            <div className="text-4xl font-semibold font-serif py-5 mb-5">
               <p>Sale...</p>
            </div>
            <div className="">
               {isDataLoading ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14 md:gap-10 lg:gap-24">
                     <Saleloading />
                  </div>
               ) : (
                  <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14 md:gap-10 lg:gap-24">
                     {Array.isArray(allData) &&
                        allData.slice(0, 3).map((item, index) => (
                           <div key={index}>
                              <Link href={`/dress/${item._id}`}>
                                 <div className="w-full aspect-[9/12] overflow-hidden object-cover">
                                    <Image
                                       className="w-full h-full object-cover object-top hover:scale-110 transition ease-in-out duration-200"
                                       src={item.image}
                                       alt={item.name}
                                       width={500}
                                       height={600}
                                       quality={70}
                                       placeholder="blur"
                                       blurDataURL={blurDataUrl}
                                    />
                                 </div>
                                 <div className="text-xl text-center">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="font-bold opacity-80">
                                       {item.price}
                                    </p>
                                 </div>
                              </Link>
                              <div className="flex justify-center mt-2">
                                 <button className="bg-black text-white font-semibold px-6 py-2 hover:scale-105">
                                    Add To Cart
                                 </button>
                              </div>
                           </div>
                        ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
