import { paddingForpage } from "@/app/sizeDeclare";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Female() {
   const femaleCollection = [
      {
         name: "Hump tum zumzum tees",
         price: "$100",
         image: "/images/men1.jpg",
         rating: 4,
      },
      {
         name: "Hump tum zumzum tees",
         price: "$100",
         image: "/images/men2.jpg",
         rating: 4.5,
      },
      {
         name: "Hump tum zumzum tees",
         price: "$100",
         image: "/images/men3.jpg",
         rating: 5,
      },
      {
         name: "Hump tum zumzum tees",
         price: "$100",
         image: "/images/men4.jpg",
         rating: 3.5,
      },
      {
         name: "Hump bump pop top tees tumtu",
         price: "$100",
         image: "/images/model.jpg",
         rating: 4.5,
      },
      {
         name: "Hump bump pop top tees tumtu",
         price: "$100",
         image: "/images/men6.jpg",
         rating: 4.5,
      },
   ];

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
                     <div className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
                        {femaleCollection.map((item, index) => (
                           <div
                              className=" col-span-1 shadow-product rounded-lg"
                              key={index}
                           >
                              <Link href={`/dress/${index}`}>
                                 <div className=" w-full bg-gray-100 flex flex-col p-2 rounded-lg">
                                    <div className=" w-full aspect-[9/11] rounded-lg overflow-hidden">
                                       <Image
                                          className="w-full h-full object-cover object-top hover:scale-110 transition ease-in-out duration-300"
                                          src={item.image}
                                          alt={item.name}
                                          width={400}
                                          height={500}
                                          quality={70}
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
