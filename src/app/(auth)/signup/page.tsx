"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SignUpInterface } from "@/types/declareTypes";

export default function Signup() {
   const [formData, setFormData] = useState<SignUpInterface[]>([]);
   const handelSignupChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handelSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
   };
   return (
      <>
         <div className=" mt-4 sm:mt-0">
            <div className=" relative">
               <div className=" w-full h-screen-navbar overflow-hidden object-cover ">
                  <Image
                     className="w-full h-full object-cover object-top "
                     src="/images/signup.svg"
                     alt="logo"
                     width={1000}
                     height={1000}
                     quality={100}
                  />
               </div>
               <div className="lg:w-1/2 xl:w-2/6 aspect-square md:aspect-[9/10] xl:aspect-[9/12] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white rounded-3xl">
                  <div className=" flex flex-col font-semibold text-xl sm:text-2xl md:text-3xl text-center py-5 sm:py-7 lg:py-10">
                     Sign up today to start planning
                     <span> your next adventure</span>
                  </div>
                  <div className=" px-10 lg:mt-10">
                     <form
                        className="flex flex-col gap-6"
                        onSubmit={handelSignupSubmit}
                     >
                        <div className=" flex flex-col">
                           <label className="font-medium" htmlFor="">
                              Username
                           </label>
                           <input
                              className=" outline-1 outline outline-gray-500 px-5 py-2 font-medium text-xl rounded-lg"
                              type="text"
                              name=""
                              id="Username"
                              onChange={handelSignupChnage}
                           />
                        </div>
                        <div className=" flex flex-col">
                           <label className="font-medium" htmlFor="">
                              Email
                           </label>
                           <input
                              className=" outline-1 outline outline-gray-500 px-5 py-2 font-medium text-xl rounded-lg"
                              type="email"
                              name=""
                              id="email"
                              onChange={handelSignupChnage}
                           />
                        </div>
                        <div className=" flex flex-col">
                           <label className="font-medium" htmlFor="">
                           Password
                           </label>
                           <input
                              className=" outline-1 outline outline-gray-500 px-5 py-2 font-medium text-xl rounded-lg"
                              type="password"
                              name=""
                              id="password"
                              onChange={handelSignupChnage}
                           />
                        </div>
                        <div className=" flex justify-center mt-5">
                           <button
                              type="submit"
                              className=" font-semibold text-xl  px-10 py-2 rounded-lg bg-black  text-white"
                           >
                              Sign up
                           </button>
                        </div>
                     </form>
                     <div className="">
                        <p className="text-center mt-5">
                           Already have an account?{" "}
                           <span className=" font-semibold">
                              <Link href="/login">Login</Link>
                           </span>
                        </p>
                     </div>
                     <div className=" pb-3">
                        <p className="text-center mt-5">
                           By signing up, you agree to our{" "}
                           <span className=" font-semibold">
                              Terms and Conditions
                           </span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
