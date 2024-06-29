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
               <div className=" text-4xl font-semibold font-serif py-5 mb-5">
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

         {/* <div className="bg-gray-300 w-full aspect-[16/6] flex justify-center items-center relative mb-16 sm:mb-20">
            <div className=" w-9/12 aspect-[16/8] relative">
               <Link href="/dress/sales">
                  <Image
                     className="w-full h-full object-cover sm:object-fill object-center"
                     src="/images/sale5.svg"
                     alt="footer image"
                     width={1000}
                     height={800}
                     quality={100}
                  />
                  <div className=" absolute bottom-[0%] sm:bottom-[12%] left-[6.5%]  sm:left-[15.7%] z-50">
                     <button
                        type="submit"
                        className=" bg-gray-800 text-white hover:text-black hover:bg-white outline outline-1 outline-black    sm:text-sm text-xs lg:text-xl font-semibold px-4 sm:px-5  lg:px-6 lg:py-1 xl:px-7 xl:py-2  "
                     >
                        Buy Now
                     </button>
                  </div>
               </Link>
            </div>
         </div> */}
      </>
   );
}
