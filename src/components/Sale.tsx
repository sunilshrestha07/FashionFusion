import { paddingForpage } from "@/app/sizeDeclare";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sale() {
   const saleItems = [
      {
         id: 1,
         name: "Hump tees",
         href: "/male",
         image: "/images/women8.jpg",
         price: "$100",
         category: "tshirt",
      },
      {
         id: 2,
         name: "Hump tees",
         href: "/male",
         image: "/images/women9.jpg",
         price: "$100",
         category: "hoodie",
      },
      {
         id: 3,
         name: "Hump tees",
         href: "/male",
         image: "/images/women5.jpg",
         price: "$100",
         category: "pants",
      },
      {
         id: 4,
         name: "Hump tees",
         href: "/male",
         image: "/images/main.jpg",
         price: "$100",
         category: "tshirt",
      },
      {
         id: 5,
         name: "Hump tees",
         href: "/male",
         image: "/images/model.jpg",
         price: "$100",
         category: "tshirt",
      },
   ];
   return (
      <>
         <div className={`${paddingForpage} bg-blue-50`}>
            <div className="">
               <div className=" text-4xl font-semibold font-serif py-5">
                  <p>Sale...</p>
               </div>
               <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14 md:gap-10 lg:gap-24">
                  {saleItems.splice(0, 3).map((item) => (
                     <div className="" key={item.id}>
                        <Link href={`/dress/${item.id}`}>
                           <div className=" w-full aspect-[9/12] overflow-hidden object-cover">
                              <Image
                                 className="w-full h-full object-cover object-top hover:scale-110 transition ease-in-out duration-200"
                                 src={item.image}
                                 alt={item.name}
                                 width={500}
                                 height={600}
                                 quality={70}
                              />
                           </div>
                           <div className=" text-xl text-center">
                              <p className=" font-bold">{item.name}</p>
                              <p className=" font-bold opacity-80">
                                 {item.price}
                              </p>
                           </div>
                        </Link>
                        <div className="flex justify-center mt-2">
                           <button className=" bg-black text-white font-semibold px-6 py-2 hover:scale-105 ">
                              Add To Cart
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
}
