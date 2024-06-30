"use client";

import Image from "next/image";
import React, { useState } from "react";
import { VerifyInterface } from "@/types/declareTypes";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function EmailVerify() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get("email");
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const [formData, setFormData] = useState<VerifyInterface>({
      email: email || "",
      verificationCode: "",
   });
   const handelVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handelVerifySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const res = await axios.post("/api/user/verify", formData);
         if (res.status === 200) {
            router.push("/");
            setIsLoading(false);
         }
      } catch (error: any) {
         setIsLoading(false);
         console.error("verification failed", error);
         if (axios.isAxiosError(error)) {
            toast.error(
               error.response?.data?.message ||
                  "An error occurred during verification"
            );
         } else {
            toast.error("An unknown error occurred during verification");
         }
      }
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
               <div className="lg:w-1/2 xl:w-2/6 aspect-video  absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white rounded-3xl">
                  <div className=" flex flex-col font-semibold text-xl sm:text-2xl md:text-3xl text-center py-5 ">
                     Verify your account
                     <span className="text-base mt-2">
                        Enter your verification code and start exploring
                     </span>
                  </div>
                  <div className=" px-10 lg:mt-3">
                     <form
                        className="flex flex-col gap-6"
                        onSubmit={handelVerifySubmit}
                     >
                        <div className=" flex flex-col">
                           <label className="font-medium">
                              Verification code
                           </label>
                           <input
                              className=" outline-1 outline outline-gray-500 px-5 py-2 font-medium text-xl rounded-lg"
                              type="text"
                              name=""
                              id="verificationCode"
                              onChange={handelVerifyChange}
                           />
                        </div>
                        <div className=" flex justify-center ">
                           <button
                              type="submit"
                              className={`font-semibold text-xl  px-10 py-2 rounded-lg bg-black text-white ${
                                 isLoading ? "cursor-not-allowed" : ""
                              }`}
                              disabled={isLoading}
                           >
                              {isLoading ? (
                                 <div className=" flex justify-center items-center px-3 py-">
                                    <span className="loader"></span>
                                 </div>
                              ) : (
                                 "Sign up"
                              )}
                           </button>
                        </div>
                     </form>
                     <div className=" pb-5">
                        <p className="text-center mt-5">
                           By continuing to use FashionFusion, you agree to our
                           all{" "}
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
