"use client";

import { paddingForpage } from "@/app/sizeDeclare";
import Dressloding from "@/components/Dressloding";
import { getDressInterface } from "@/types/declareTypes";
import { blurDataUrl } from "@/utils/BlurDataUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Female() {
   const [maleData, setMaleData] = useState<getDressInterface[]>([]);
   const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
   const [currentPage, setCurrentPage] = useState<number>(1);

   const itemsPerPage = 8;

   const fetchData = async () => {
      setIsDataLoading(true);
      const res = await fetch("/api/dress");
      const data = await res.json();
      const maleItem = data.dress.filter(
         (item: getDressInterface) => item.category === "male"
      );
      setIsDataLoading(false);
      setMaleData(maleItem);
   };

   useEffect(() => {
      fetchData();
   }, []);

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
      window.scrollTo({ top: 0, behavior: "smooth" });
   }

   useEffect(() => {
      ScrollToTop();
   }, [maleData]);

   const totalPages = Math.ceil(maleData.length / itemsPerPage);
   const currentData = maleData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      ScrollToTop();
   };
   return (
      <>
         <div className=" bg-blue-50">
            <div className={paddingForpage}>
               <div className="">
                  <div className="">
                     <div className=" text-4xl font-medium font-serif">
                        <p>Male Collection</p>
                     </div>
                     <div className=" font-medium">
                        <p>Our collection of male&apos;s clothing</p>
                     </div>
                  </div>
                  <div className="mt-5">
                     <Link href="/dress">
                        <Image
                           width={40}
                           height={40}
                           className="w-7 aspect-square object-cover object-center"
                           src="/icons/backbtn.png"
                           alt=""
                        />
                     </Link>
                  </div>
                  <div className=" my-10">
                     {isDataLoading ? (
                        <div className="">
                           <Dressloding />
                           <Dressloding />
                        </div>
                     ) : (
                        <div className="">
                           <div className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
                              {maleData.length > 0 &&
                                 maleData.map((item) => (
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
                                                   quality={60}
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
                                                            {generateStars(
                                                               item.rating
                                                            )}
                                                         </div>
                                                         <p>{item.rating}</p>
                                                      </div>
                                                   </div>
                                                   <p className="">
                                                      {item.price}
                                                   </p>
                                                </div>
                                             </div>
                                          </div>
                                       </Link>
                                    </div>
                                 ))}
                           </div>
                           <div className="flex justify-between mt-8 font-semibold">
                              <button
                                 className="px-4 py-2 mx-1 bg-black text-white  rounded"
                                 onClick={() =>
                                    handlePageChange(currentPage - 1)
                                 }
                                 disabled={currentPage === 1}
                              >
                                 Previous
                              </button>
                              <span className="px-4 py-2 mx-1">
                                 {currentPage} / {totalPages}
                              </span>
                              <button
                                 className="px-4 py-2 mx-1 bg-black text-white rounded"
                                 onClick={() =>
                                    handlePageChange(currentPage + 1)
                                 }
                                 disabled={currentPage === totalPages}
                              >
                                 Next
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
