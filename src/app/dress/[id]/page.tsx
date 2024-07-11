"use client";

import { paddingForpage } from "@/app/sizeDeclare";
import Recommendation from "@/components/Recommendation";
import {
   AddToCart,
   BuyInterface,
   getDressInterface,
} from "@/types/declareTypes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/app/redux/Cartslice";
import Sceleton from "@/components/Sceleton";
import { blurDataUrl } from "@/utils/BlurDataUrl";

export default function AboutDress() {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [specificDress, setSpecificDress] = useState<getDressInterface | null>(
      null
   );
   const [selectedSize, setSelectedSize] = useState<string>("");
   const [formData, setFormData] = useState<BuyInterface>({
      name: "",
      productId: "",
      price: 0,
      size: "",
      color: "",
   });

   const fetchData = async () => {
      const res = await fetch(`/api/dress/${id}`);
      const data = await res.json();
      setSpecificDress(data.dress);
   };

   useEffect(() => {
      fetchData();
   }, [id]);

   useEffect(() => {
      if (specificDress) {
         setFormData((prevFormData) => ({
            ...prevFormData,
            name: specificDress.name,
            productId: specificDress._id,
            price: specificDress.price,
            size: selectedSize,
         }));
      }
   }, [specificDress, selectedSize]);

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [specificDress]);

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
               className="h-5 aspect-square object-contain"
            />
         );
      }
      return stars;
   };

   const afterDiscountPrice = (price: number, discount: number) => {
      const discountedPrice = (price * (100 - discount)) / 100;
      return discountedPrice;
   };

   const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.color || !formData.size) {
         alert("Please select color and size");
         return;
      }
      console.log(formData);
   };

   const handleAddToCart = (item: AddToCart) => {
      // if (specificDress) {
      //    const { _id, name, price } = specificDress;
      //    const quantity = 1; // Assuming adding one item to cart
      //    const totalPrice = price * quantity;

      //    //  const newItem: AddToCart = { _id, name, price, quantity, totalPrice };
      //    //  dispatch(addItemToCart(newItem));
      // }
      dispatch(addItemToCart(item));
      console.log("Item added to cart:", item);
   };

   if (!specificDress) {
      return (
         <div>
            <Sceleton />
         </div>
      );
   }

   return (
      <>
         <div className=" ">
            <form onSubmit={handleBuy}>
               <div
                  className={`${
                     specificDress.category === "female"
                        ? "bg-orange-50"
                        : "bg-blue-50"
                  } ${paddingForpage} `}
               >
                  <div className="border-b-2 border-gray-600">
                     <div className={`flex flex-col gap-5 mb-10`}>
                        <div className="">
                           <Link href="/dress">
                              <Image
                                 width={40}
                                 height={40}
                                 className="w-7 aspect-square object-cover object-center"
                                 src="/icons/backbtn.png"
                                 alt="Back Button"
                              />
                           </Link>
                        </div>
                        <div className="">
                           <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-5 gap-6">
                              <div className="row-span-1 sm:col-span-2 w-full aspect-[9/12] sm:w-10/12 xl:aspect-[9/11] overflow-hidden">
                                    <Image
                                       className="w-full h-full object-cover object-top"
                                       src={specificDress.image}
                                       alt="Dress image"
                                       width={600}
                                       height={800}
                                       quality={100}
                                       placeholder="blur"
                                       blurDataURL={blurDataUrl}
                                    />
                              </div>
                              <div className="row-span-1 sm:col-span-3 flex flex-col justify-between">
                                 <div className="flex flex-col gap-6 sm:gap-2 md:gap-3">
                                    <div className="">
                                       <p className="text-2xl md:text-3xl xl:text-4xl font-semibold capitalize">
                                          {specificDress.name}
                                       </p>
                                       <div className="flex gap-5 items-center md:mt-2">
                                          <div className="flex gap-1 items-center">
                                             {generateStars(
                                                specificDress.rating
                                             )}
                                          </div>
                                          <div className="">
                                             <p className="font-semibold text-xl">
                                                {specificDress.rating}
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="">
                                       <p className="text-base sm:text-base xl:text-xl font-medium">
                                          {specificDress.description}
                                       </p>
                                    </div>
                                    <div className="flex gap-16 lg:mt-4 mb-4">
                                       <div className="">
                                          <p className="text-sm sm:text-xl xl:text-2xl font-semibold">
                                             Available Sizes:
                                          </p>
                                          {/* <div className="flex gap-4">
                                             {specificDress.size.map((size, index) => (
                                                <div key={index}>
                                                   <label>
                                                      <input
                                                         className="hidden"
                                                         type="radio"
                                                         name="size"
                                                         value={size}
                                                         checked={selectedSize === size}
                                                         onChange={() => setSelectedSize(size)}
                                                      />
                                                      <div
                                                         className={`h-5 w-5 p-2 mt-2 rounded-full flex justify-center items-center bg-gray-500 text-white font-semibold text-sm cursor-pointer hover:outline-2 hover:outline outline-black ${
                                                            selectedSize === size ? "outline outline-2" : ""
                                                         }`}
                                                      >
                                                         {size}
                                                      </div>
                                                   </label>
                                                </div>
                                             ))}
                                          </div> */}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-5">
                                    <div className="flex gap-6 text-base md:text-xl xl:text-2xl font-semibold">
                                       <p>NPR:</p>
                                       <p className="opacity-60 line-through">
                                          {specificDress.price}
                                       </p>
                                       <p className="">
                                          {afterDiscountPrice(
                                             specificDress.price,
                                             specificDress.discount
                                          )}
                                       </p>
                                    </div>
                                    <div className="flex sm:gap-5 lg:gap-10 justify-between sm:justify-start">
                                       <button
                                          type="submit"
                                          className="bg-black text-white hover:text-black hover:bg-white outline outline-1 outline-black text-base lg:text-xl font-semibold px-7 py-2"
                                       >
                                          Buy Now
                                       </button>
                                       <button
                                          type="button"
                                          className="bg-black text-white hover:text-black hover:bg-white outline outline-1 outline-black text-base lg:text-xl font-semibold px-7 py-2"
                                          onClick={()=>handleAddToCart(specificDress)}
                                       >
                                          Add To Cart
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
            <div className="">
               <Recommendation Category={specificDress.category} />
            </div>
         </div>
      </>
   );
}
