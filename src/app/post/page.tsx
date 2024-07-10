"use client";

import React, { useRef, useState } from "react";
import { paddingForpage } from "../sizeDeclare";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { dressInterface } from "@/types/declareTypes";

export default function Post() {
   const imageRef = useRef<HTMLInputElement | null>(null);
   const [image, setImage] = useState<File | null>(null);
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [firebaseUrl, setFirebaseUrl] = useState<string>("");
   const [isUploading, setIsUploading] = useState<boolean>(false);
   const [formData, setFormData] = useState<dressInterface[]>([]);

   const handelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         setImageUrl(URL.createObjectURL(file));
      }
   };

   const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
     setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handlePictureUpload = async () => {
      if (image) {
         const imageRef = ref(storage, `profile/${image.name + v4()}`);
         await uploadBytes(imageRef, image);
         const firebaseUrl = await getDownloadURL(imageRef);
         return firebaseUrl;
      }
      return null;
   };

   const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsUploading(true);
      console.log(formData);
      try {
         const uploadedImageUrl = await handlePictureUpload();
         const updatedFormData = { ...formData, image: uploadedImageUrl };
         const res = await axios.post("/api/dress", updatedFormData);
         if (res.status === 200) {
            toast.success("Profile update success");
            setIsUploading(false);
            window.location.reload()
         }
      } catch (error: any) {
         setIsUploading(false);
         if (axios.isAxiosError(error)) {
            toast.error(
               error.response?.data?.message ||
                  "An error occurred during posting product"
            );
         } else {
            toast.error("An error occurred during posting product");
         }
      }
   };

   return (
      <div className="">
         <div className={paddingForpage}>
            <div className="">
               <div className="w-full ">
                  <form onSubmit={handleProfileSubmit}>
                     <div className="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-5 sm:gap-10  xl:gap-0 ">
                        <div className=" row-span-2 sm:col-span-2 flex flex-col gap-3 w-full xl:w-10/12">
                           <div className=" flex flex-col">
                              <label className="font-medium" htmlFor="name">
                                 Name of the product
                              </label>
                              <input
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium"
                                 type="text"
                                 id="name"
                                 onChange={handelChange}
                                 required
                              />
                           </div>
                           <div className=" flex flex-col">
                              <label
                                 className="font-medium"
                                 htmlFor="description"
                              >
                                 Description
                              </label>
                              <textarea
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium w-full aspect-[16/6]"
                                 id="description"
                                 onChange={handelChange}
                                 required
                              ></textarea>
                           </div>
                           <div className=" flex flex-col">
                              <label className="font-medium" htmlFor="price">
                                 Price
                              </label>
                              <input
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium"
                                 type="number"
                                 id="price"
                                 onChange={handelChange}
                                 required
                              />
                           </div>
                           <div className=" flex flex-col">
                              <label className="font-medium" htmlFor="discount">
                                 Discount rate
                              </label>
                              <input
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium"
                                 type="number"
                                 id="discount"
                                 onChange={handelChange}
                                 required
                              />
                           </div>
                           <div className=" flex flex-col">
                              <label className="font-medium" htmlFor="category">
                                 Category
                              </label>
                              <select
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium"
                                 id="category"
                                 onChange={handelChange}
                                 required
                              >
                                 <option value="">Category</option>
                                 <option className="p-3" value="male">
                                    Male
                                 </option>
                                 <option className="p-3" value="female">
                                    Female
                                 </option>
                              </select>
                           </div>
                           <div className=" flex flex-col">
                              <label className="font-medium" htmlFor="category">
                                 Sale
                              </label>
                              <select
                                 className="p-3 rounded-md outline outline-2 bg-blue-50 font-medium"
                                 id="sale"
                                 onChange={handelChange}
                                 required
                              >
                                 <option value="">Sale</option>
                                 <option className="p-3" value="false">
                                    No
                                 </option>
                                 <option className="p-3" value="true">
                                    Yes
                                 </option>
                              </select>
                           </div>
                        </div>

                        <div className=" row-span-1 sm:col-span-3 w-full flex flex-col gap-10">
                           <input
                              type="file"
                              accept="image/*"
                              id="image"
                              ref={imageRef}
                              hidden
                              onChange={handelImageChange}
                           />
                           <div
                              onClick={() => imageRef.current?.click()}
                              className=" w-full  aspect-[16/7] mt-6 flex justify-center items-center rounded-md outline-dashed outline-2 overflow-hidden"
                           >
                              {imageUrl ? (
                                 <div className=" w-full h-full ">
                                    <img
                                       className="w-full h-full object-cover object-center"
                                       src={imageUrl}
                                       alt=""
                                    />
                                 </div>
                              ) : (
                                 <div className="">
                                    <img
                                       className="w-10 aspect-square"
                                       src="/icons/plus.png"
                                       alt=""
                                    />
                                 </div>
                              )}
                           </div>
                           <div className=" flex justify-center sm:justify-start">
                              <button
                                 type="submit"
                                 className={`bg-black font-semibold px-8 text-white py-2 rounded-lg sm:w-1/4 w-1/2 ${
                                    isUploading ? "cursor-not-allowed" : ""
                                 }`}
                                 disabled={isUploading}
                              >
                                 {isUploading ? (
                                    <div className=" flex justify-center items-center px-3 py-">
                                       <span className="loader"></span>
                                    </div>
                                 ) : (
                                    "Post"
                                 )}
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
