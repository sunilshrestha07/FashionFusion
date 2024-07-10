"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";

export default function Dashboard() {
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );

   const data = [
      {
         id: "1",
         orderItem: "shirt",
         quantity: 2,
         total: 300,
         status: "pending",
      },
      {
         id: "1",
         orderItem: "shirt",
         quantity: 2,
         total: 300,
         status: "pending",
      },
      {
         id: "1",
         orderItem: "shirt",
         quantity: 2,
         total: 300,
         status: "pending",
      },
   ];
   return (
      <>
         <div className="  ">
            <div className=" h-full flex flex-col gap-16 xl:gap-20 py-10">
               <div className="px-7 xl:px-72 ">
                  <form className=" grid sm:grid-cols-2" action="  ">
                     <div className="col-span-1 w-full flex flex-col sm:flex-row justify-center items-center gap-5 py-4 sm;px-5">
                        <div className=" w-56 aspect-square rounded-full overflow-hidden">
                           <img
                              className=" w-full h-full object-cover object-center"
                              src={currentUser?.avatar}
                              alt=""
                           />
                        </div>
                        <div className=" font-medium text-base w-full  ">
                           <div className=" w-full lg:w-10/12 flex flex-col gap-3 ">
                              <div className=" flex flex-col justify-center items-center ">
                                 <input
                                    className="w-full rounded-lg px-2 py-2 sm:py-1 bg-gray-100 outline outline-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    defaultValue={currentUser?.userName}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-full rounded-lg px-2 py-2 sm:py-1 bg-gray-100 outline outline-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    defaultValue={currentUser?.email}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-full rounded-lg px-2 py-2 sm:py-1 bg-gray-100 outline outline-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    placeholder="**********"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className=" flex justify-center items-center ">
                        <div className=" flex sm:flex-col gap-3 w-full sm:w-1/2 text-sm sm:test-base  justify-start items-start">
                           <div className=" w-full ">
                              <button
                                 type="submit"
                                 className="bg-black text-white font-semibold px-3 sm:px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black w-full"
                              >
                                 Edit Profile
                              </button>
                           </div>
                           <div className="w-full">
                              <Link href="/">
                                 <div className="bg-black text-white font-semibold px-3 sm:px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black w-full text-center">
                                    Change Password
                                 </div>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </form>
                  <div className="mt-10">
                     {currentUser?.isAdmin ? (
                        <div className="">
                           <Link href="/post">
                              <button className=" bg-black text-white font-serif px-8 py-2 rounded-lg">
                                 Add Post
                              </button>
                           </Link>
                        </div>
                     ) : (
                        <div className=""></div>
                     )}
                  </div>
               </div>

               <div className=" pb-10 px-4 xl:px-72">
                  <div className="">
                     <p className=" text-2xl font-semibold my-3 sm:my-5">
                        My Orders
                     </p>
                  </div>
                  <div className="orders-table w-full ">
                     <table className="min-w-full border-collapse border border-gray-200">
                        <thead className=" text-sm sm:text-base">
                           <tr className="bg-gray-100">
                              <th className=" px-3 sm:px-4 py-3 border border-gray-200 text-left">
                                 Order ID
                              </th>
                              <th className=" px-3 sm:px-4 py-3 border border-gray-200 text-left">
                                 Order Item
                              </th>
                              <th className=" px-3 sm:px-4 py-3 border border-gray-200 text-left">
                                 Quantity
                              </th>
                              <th className=" px-3 sm:px-4 py-3 border border-gray-200 text-left">
                                 Total
                              </th>
                              <th className=" px-3 sm:px-4 py-3 border border-gray-200 text-left">
                                 Status
                              </th>
                           </tr>
                        </thead>
                        <tbody className="bg-red-500">
                           {data.map((order, index) => (
                              <tr
                                 className="bg-white even:bg-gray-50 hover:bg-gray-100 text-sm sm:text-base"
                                 key={index}
                              >
                                 <td className=" px-3 sm:px-4 py-3 border border-gray-200">
                                    {order.id}
                                 </td>
                                 <td className=" px-3 sm:px-4 py-3 border border-gray-200">
                                    {order.orderItem}
                                 </td>
                                 <td className=" px-3 sm:px-4 py-3 border border-gray-200">
                                    {order.quantity}
                                 </td>
                                 <td className=" px-3 sm:px-4 py-3 border border-gray-200">
                                    {order.total}
                                 </td>
                                 <td className=" px-3 sm:px-4 py-3 border border-gray-200">
                                    {order.status}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
