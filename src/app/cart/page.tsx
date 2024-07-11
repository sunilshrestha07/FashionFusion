"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { paddingForpage } from "../sizeDeclare";
import Link from "next/link";

export default function Cart() {
   const cartItems = useSelector((state: RootState) => state.saved.items);

   return (
      <div className={paddingForpage}>
         {cartItems.length > 0 ? (
            <div className="grid grid-cols-9 gap-5">
               <div className="col-span-6 bg-red-200 w-full aspect-[16/7] outline outline-1">
                  <table className="w-full">
                     <thead className="bg-blue-500">
                        <tr>
                           <th>Product</th>
                           <th>Name</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Sub Total</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cartItems.map((item, index) => (
                           <tr key={index} className="justify-center">
                              <td className="w-16 h-20 overflow-hidden">
                                 <Image
                                    className="w-full h-full object-cover object-center"
                                    src={item.image}
                                    alt="product image"
                                    width={100}
                                    height={100}
                                 />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price * item.quantity}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="col-span-3 bg-green-300 w-full">Summary Section</div>
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
