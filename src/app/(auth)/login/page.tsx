"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LoginInterface } from "@/types/declareTypes";

export default function Login() {
   const [formData, setFormData] = useState<LoginInterface[]>([]);
   const handelLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handelLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
   };
   return (
      <>
         <div className="">
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
                     Welcome back.
                     <span>Log in and start exploring.</span>
                  </div>
                  <div className=" px-10 lg:mt-10">
                     <form
                        className="flex flex-col gap-6"
                        onSubmit={handelLoginSubmit}
                     >
                        <div className=" flex flex-col">
                           <label className="font-medium" htmlFor="">
                              Email
                           </label>
                           <input
                              className=" outline-1 outline outline-gray-500 px-5 py-2 font-medium text-xl rounded-lg"
                              type="email"
                              name=""
                              id="email"
                              onChange={handelLoginChange}
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
                              onChange={handelLoginChange}
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
                           <span className=" font-semibold opacity-60">
                              <Link href="/login">Forgot your password?</Link>
                           </span>
                        </p>
                     </div>
                     <div className="">
                        <p className="text-center mt-5">
                           Don't have an account?{" "}
                           <span className=" font-semibold">
                              <Link href="/signup">Sign up</Link>
                           </span>
                        </p>
                     </div>
                     <div className="  sm:pb-0">
                        <p className="text-center mt-5">
                        By continuing to use FashionFusion, you agree to our all{" "}
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
