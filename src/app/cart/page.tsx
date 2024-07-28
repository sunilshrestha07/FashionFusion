"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { paddingForCart } from "../sizeDeclare";
import Link from "next/link";
import { removeItemFromCart } from "../redux/Cartslice";
import { AddToCart } from "@/types/declareTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoginMessage from "@/components/LoginMessage";
import { toast } from "react-toastify";

export default function Cart() {
   const cartItems = useSelector((state: RootState) => state.saved.items);
   const router = useRouter();
   const loginMessageRef = useRef<HTMLDivElement>(null);
   const [isUploading, setIsUploading] = useState<boolean>(false);
   const [isUploadingEsewa, setIsUploadingEsewa] = useState<boolean>(false);
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );
   const [showLoginMessage, setShowLoginMessage] = useState<boolean>(false);
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
         const res = await axios.post("/api/order", orderData);
         setIsUploading(false);
         if (res.status === 200) {
            router.push("/success");
            toast.success("Order created successfully!");
         } else {
            toast.error("Error creating order");
         }
      } catch (error) {
         setIsUploading(false);
         toast.error("Error creating order");
      }
   };

   const handleClick = () => {
      if (currentUser) {
         handleOrderSubmit();
      } else {
         setShowLoginMessage(!showLoginMessage);
      }
   };

   const createForm = (params: Record<string, string>) => {
      const form = document.createElement("form");
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.method = "POST";

      Object.keys(params).forEach((key) => {
         const input = document.createElement("input");
         input.type = "hidden";
         input.name = key;
         input.value = params[key];
         form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
   };

   const handleEsewaPayOrder = async () => {
      try {
         const res = await axios.post("/api/esewa", {
            amount: grandTotal.toString(),
         });

         const paymentParams = {
            amount: grandTotal.toString(),
            tax_amount: "0",
            total_amount: grandTotal.toString(),
            transaction_uuid: res.data.dataToSend.uuid,
            product_code: "EPAYTEST",
            product_service_charge: "0",
            product_delivery_charge: "0",
            success_url: "https://fashion-fusion-suneel.vercel.app/dress",
            failure_url: "https://fashion-fusion-suneel.vercel.app/cart",
            signed_field_names: "total_amount,transaction_uuid,product_code",
            signature: res.data.dataToSend.signature,
         };

         const form = document.createElement("form");
         form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
         form.method = "POST";

         Object.keys(paymentParams).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = paymentParams[key as keyof typeof paymentParams];
            form.appendChild(input);
         });

         document.body.appendChild(form);

         form.submit();
         const orderData = {
            userId: currentUser?._id,
            dressName: cartItems.map((item) => item.name).join(", "),
            userEmail: currentUser?.email,
            userName: currentUser?.userName,
            totalPrice: grandTotal,
            quantity: cartItems.reduce(
               (total, item) => total + item.quantity,
               0
            ),
         };
         try {
            const res = await axios.post("/api/order", orderData);
            if (res.status === 200) {
               router.push("/success");
               console.log("Order created success", res.data);
            } else {
               console.error("Error creating order");
            }
         } catch (error) {
            console.error("Error creating order", error);
         }
      } catch (error) {
         console.log("Error esewa payment order", error);
         toast.error("Error esewa payment order");
      }
   };

   const handleBuyWithEsewa = () => {
      if (currentUser) {
         handleEsewaPayOrder();
      } else {
         setShowLoginMessage(!showLoginMessage);
      }
   };

   //handel click outside the message
   const handleClickOutside = (event: MouseEvent) => {
      if (
         loginMessageRef.current &&
         !loginMessageRef.current.contains(event.target as Node)
      ) {
         setShowLoginMessage(false);
         document.body.style.overflow = "auto";
      }
   };

   useEffect(() => {
      if (showLoginMessage) {
         document.addEventListener("click", handleClickOutside);
         document.body.style.overflow = "hidden";
      } else {
         document.removeEventListener("click", handleClickOutside);
         document.body.style.overflow = "auto";
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [showLoginMessage]);

   return (
      <div className={paddingForCart}>
         {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-9 gap-16 md:gap-5 w-full bg-gray-200">
               <div className="col-span-6 w-full h-auto sm:h-80 outline outline-1 outline-gray-200 overflow-y-scroll">
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
                                 <div className="w-full flex justify-center">
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
                              <td className="text-center w-1/12 p-0">
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
                  <div className="w-full text-center mt-3">
                     <p className="text-xl sm:text-3xl font-semibold">
                        Cart Total
                     </p>
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Sub Total:</p>
                        <p>Rs: {grandTotal}</p>
                     </div>
                     <div className="flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Shipping Cost</p>
                        <p>Rs: 100</p>
                     </div>
                     <div className="flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                        <p>Grand Total:</p>
                        <p>Rs: {grandTotal + 100}</p>
                     </div>
                  </div>
                  <div>
                     <button
                        className={`w-full bg-black text-white py-3 rounded-md outline outline-1 hover:bg-white hover:text-black font-semibold ${
                           isUploading ? "cursor-not-allowed" : ""
                        }`}
                        onClick={handleClick}
                     >
                        {isUploading ? (
                           <div className="flex justify-center items-center px-3">
                              <span className="loaderr"></span>
                           </div>
                        ) : (
                           "Cash on delivery"
                        )}
                     </button>
                     {showLoginMessage && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                           <div
                              className="bg-white p-6 rounded-md shadow-md"
                              ref={loginMessageRef}
                              onClick={(e) => e.stopPropagation()}
                           >
                              <LoginMessage />
                           </div>
                        </div>
                     )}
                  </div>

                  <div>
                     <button
                        type="submit"
                        className={`w-full bg-green-400 text-black py-3 rounded-md outline outline-1 hover:bg-white hover:text-black font-semibold ${
                           isUploadingEsewa ? "cursor-not-allowed" : ""
                        }`}
                        onClick={handleBuyWithEsewa}
                     >
                        {isUploadingEsewa ? (
                           <div className="flex justify-center items-center px-3">
                              <span className="loader"></span>
                           </div>
                        ) : (
                           "Pay with Esewa"
                        )}
                     </button>
                     {showLoginMessage && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                           <div
                              className="bg-white p-6 rounded-md shadow-md"
                              ref={loginMessageRef}
                              onClick={(e) => e.stopPropagation()}
                           >
                              <LoginMessage />
                           </div>
                        </div>
                     )}
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
