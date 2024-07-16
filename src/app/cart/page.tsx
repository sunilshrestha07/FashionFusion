"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { paddingForCart } from "../sizeDeclare";
import Link from "next/link";
import { removeItemFromCart } from "../redux/Cartslice";
import { AddToCart } from "@/types/declareTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Cart() {
   const cartItems = useSelector((state: RootState) => state.saved.items);
   const router = useRouter();
   const [isUploading, setIsUploading] = useState<boolean>(false);
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );
   const dispatch = useDispatch();

   const handleRemoveFromCart = (item: AddToCart) => {
      dispatch(removeItemFromCart(item._id));
   };

   const grandTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
   );

   const handleOrderSubmit = async () => {
      const orderData = {
         userId: currentUser?._id,
         dressName: cartItems.map((item) => item.name).join(", "),
         userEmail: currentUser?.email,
         userName: currentUser?.userName,
         totalPrice: grandTotal,
         quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      };
      try {
         setIsUploading(true);
         console.log(orderData);
         const res = await axios.post("/api/order", orderData);
         if (res.status === 200) {
            setIsUploading(false);
            router.push("/success")
            console.log("Order created success", res.data);
         } else {
            setIsUploading(false);
            console.error("Error creating order");
         }
      } catch (error) {
         setIsUploading(false);
         console.error("Error creating order", error);
      }
   };

   return (
      <div className={paddingForCart}>
         {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-9 gap-16 md:gap-5 w-full bg-gray-200">
               <div className="col-span-6 w-full h-auto sm:h-80  outline outline-1 outline-gray-200 overflow-y-scroll">
                  <table className="w-full text-xs sm:text-sm xl:text-base">
                     <thead className="">
                        <tr>
                           <th className="py-4 w-1/6">Product</th>
                           <th className="py-4 w-1/6">Name</th>
                           <th className="py-4 w-1/6">Price</th>
                           <th className="py-4 w-1/6">Quantity</th>
                           <th className="py-4 w-1/6">Sub Total</th>
                           <th className="py-4 w-1/12"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {cartItems.map((item, index) => (
                           <tr
                              key={index}
                              className="justify-center bg-gray-50 my-5 border-gray-200 border-2"
                           >
                              <td className="w-1/6">
                                 <div className="w-12 h-12 sm:w-16 sm:h-16 overflow-hidden">
                                    <Image
                                       className="w-full h-full object-cover object-top"
                                       src={item.image}
                                       alt="product image"
                                       width={100}
                                       height={100}
                                       quality={40}
                                    />
                                 </div>
                              </td>
                              <td className="text-center w-1/6">{item.name}</td>
                              <td className="text-center w-1/6">
                                 {item.price}
                              </td>
                              <td className="text-center w-1/6">
                                 {item.quantity}
                              </td>
                              <td className="text-center w-1/6">
                                 {item.price * item.quantity}
                              </td>
                              <td className="text-center w-1/12 p-o">
                                 <img
                                    className="w-4 sm:w-5 aspect-square cursor-pointer"
                                    src="/icons/delete.png"
                                    alt="delete icon"
                                    onClick={() => handleRemoveFromCart(item)}
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="col-span-6 md:col-span-3 bg-gray-200 w-full px-4 py-2 rounded-md flex flex-col gap-4">
                  <div className=" w-full text-center mt-3 ">
                     <p className=" text-xl sm:text-3xl font-semibold ">
                        Cart Total
                     </p>
                  </div>
                  <div className=" flex flex-col gap-1 ">
                     <div className=" flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Sub Total:</p>
                        <p>Rs: {grandTotal}</p>
                     </div>
                     <div className=" flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Shipping Cost</p>
                        <p>Rs: 100</p>
                     </div>
                     <div className=" flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Grand Total:</p>
                        <p>Rs: {grandTotal - 100}</p>
                     </div>
                  </div>
                  <div className="" onClick={currentUser ? handleOrderSubmit : () => {toast.error("Please login to checkout") }}>
                     <button className={`w-full bg-black text-white py-3 rounded-md outline outline-1 hover:bg-white hover:text-black font-semibold ${isUploading ? "cursor-not-allowed" : ""}`}>
                     {isUploading ? (
                                 <div className=" flex justify-center items-center px-3 py-">
                                    <span className="loaderrr"></span>
                                 </div>
                              ) : (
                                 "Checkout"
                              )}
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col gap-5">
               <p className="text-4xl font-semibold">No items in cart</p>
               <div className="w-1/5">
                  <Link href="/dress">
                     <p className="text-2xl font-semibold text-gray-600 underline hover:text-black">
                        Start shopping
                     </p>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}
