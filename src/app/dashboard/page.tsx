"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout, updateSuccess } from "../redux/UserSlice";
import { userProfile } from "@/types/declareTypes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

export default function Dashboard() {
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );

   const router = useRouter();
   const dispatch = useDispatch();
   const profileRef = useRef<HTMLInputElement | null>(null);
   const [image, setImage] = useState<File | null>(null);
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [profileData, setProfileData] = useState<userProfile>({});
   const [isUploading, setIsUploading] = useState<boolean>(false);

   const handelprofileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         setImageUrl(URL.createObjectURL(file));
      }
   };

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

   const handelogOut = async () => {
      try {
         const res = await axios.post("/api/user/logout");
         if (res.status === 200) {
            router.push("/login");
            dispatch(logout());
         }
      } catch (error) {
         console.log("error logiing out");
         toast.error("Error logging out");
      }
   };

   const handelChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData({ ...profileData, [e.target.id]: e.target.value });
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

   const handelProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsUploading(true);
      try {
         if (image) {
            //if there is image change
            const uploadedImageUrl = await handlePictureUpload();
            const updatedProfileFormData = {
               ...profileData,
               avatar: uploadedImageUrl,
            };
            const res = await axios.put(
               `/api/user/${currentUser?._id}`,
               updatedProfileFormData
            );
            if (res.status === 200) {
               dispatch(updateSuccess(res.data.user));
            }
         } else {
            //if there is no image change
            const res = await axios.put(
               `/api/user/${currentUser?._id}`,
               profileData
            );
            if (res.status === 200) {
               dispatch(updateSuccess(res.data.user));
            }
         }
         setIsUploading(false);
      } catch (error: any) {
         setIsUploading(false);
         if (axios.isAxiosError(error)) {
            toast.error(
               error.response?.data?.message ||
                  "An error occurred during profile update"
            );
         } else {
            toast.error("An unknown error occurred during profile update");
         }
      }
   };
   return (
      <>
         <div className="  ">
            <div className=" h-full flex flex-col gap-16 xl:gap-20 py-10">
               <div className="px-7 xl:px-72 ">
                  <form
                     className=" grid sm:grid-cols-2"
                     onSubmit={handelProfileSubmit}
                  >
                     <div className="col-span-1 w-full flex flex-col sm:flex-row justify-center items-center gap-5 py-4 sm;px-5">
                        <input
                           type="file"
                           accept="image/*"
                           ref={profileRef}
                           hidden
                           onChange={handelprofileChange}
                        />
                        <div
                           className=" w-56 aspect-square rounded-full overflow-hidden cursor-pointer"
                           onClick={() => profileRef.current?.click()}
                        >
                           {imageUrl ? (
                              <img
                                 className=" w-full h-full object-cover object-center"
                                 src={imageUrl}
                                 alt=""
                              />
                           ) : (
                              <img
                                 className=" w-full h-full object-cover object-center"
                                 src={currentUser?.avatar}
                                 alt=""
                              />
                           )}
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
                                    onChange={handelChanges}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-full rounded-lg px-2 py-2 sm:py-1 bg-gray-100 outline outline-1"
                                    type="text"
                                    name=""
                                    id="email"
                                    defaultValue={currentUser?.email}
                                    onChange={handelChanges}
                                 />
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                 <input
                                    className="w-full rounded-lg px-2 py-2 sm:py-1 bg-gray-100 outline outline-1"
                                    type="text"
                                    name=""
                                    id="password"
                                    placeholder="**********"
                                    onChange={handelChanges}
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
                                 className={`bg-black text-white font-semibold px-3 sm:px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black w-full ${isUploading ? "cursor-not-allowed bg-white" : ""}`}
                              >
                                 {isUploading ? (
                                 <div className=" flex justify-center items-center px-3">
                                    <span className="loaderr"></span>
                                 </div>
                              ) : (
                                 "Update profile"
                              )}
                              </button>
                           </div>
                           {/* <div className="w-full">
                              <Link href="/">
                                 <div className="bg-black text-white font-semibold px-3 sm:px-6 py-2 rounded-lg hover:text-black hover:bg-white outline outline-1 outline-black w-full text-center">
                                    Change Password
                                 </div>
                              </Link>
                           </div> */}
                           <div className="w-full">
                              <div
                                 className="bg-white text-red-500 font-semibold px-3 sm:px-6 py-2 rounded-lg hover:text-black hover:bg-red-200 outline outline-1 outline-black w-full text-center cursor-pointer"
                                 onClick={handelogOut}
                              >
                                 Logout
                              </div>
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
