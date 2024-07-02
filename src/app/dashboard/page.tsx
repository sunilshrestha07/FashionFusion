"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";

export default function Dashboard() {
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );
   return (
      <>
         <div className="">
            <div className=" bg-orange-50 sm:px-72">
               <div className=" ">
                  <form className=" grid sm:grid-cols-2" action="  ">
                     <div className="col-span-1 w-full flex flex-col sm:flex-row justify-center   items-center gap-5 py-4 px-5">
                        <div className=" w-56 aspect-square rounded-full overflow-hidden">
                           <img
                              className=" w-full h-full object-cover object-center"
                              src={currentUser?.avatar}
                              alt=""
                           />
                        </div>
                        <div className=" font-medium text-base w-full ">
                           <div className=" w-full sm:w-10/12 flex flex-col gap-3 ">
                              <div className=" flex flex-col justify-center items-center ">
                                 <input
                                    className="w-10/12 sm:w-full rounded-lg px-2 py-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    defaultValue={currentUser?.userName}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-10/12 sm:w-full rounded-lg px-2 py-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    defaultValue={currentUser?.email}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-10/12 sm:w-full rounded-lg px-2 py-1"
                                    type="text"
                                    name=""
                                    id="userName"
                                    placeholder="**********"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className=" flex justify-center items-center">
                        <div className=" flex flex-col gap-3  w-1/2">
                           <button
                              type="submit"
                              className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black"
                           >
                              Edit Profile
                           </button>
                           <Link href="/">
                              <div className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black text-center">
                                 Change Password
                              </div>
                           </Link>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}
