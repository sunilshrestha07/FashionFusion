"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { buyDressInterface } from "@/types/declareTypes";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { paddingForCart } from "@/app/sizeDeclare";
import LoginMessage from "@/components/LoginMessage";

export default function Cart() {
   const params = useParams();
   const id = params ? params.id : null;
   const router = useRouter();
   const [isUploading, setIsUploading] = useState<boolean>(false);
   const currentUser = useSelector((state: any) => state.user.currentUser);
   const [showLoginMessage, setShowLoginMessage] = useState<boolean>(false);
   const [orderDress, setOrderDress] = useState<buyDressInterface>({
      _id: "",
      name: "",
      price: 0,
      image: "",
      discount: 0,
   });
   const [quantity, setQuantity] = useState<number>(1);

   const fetchData = async () => {
      if (id) {
         const res = await fetch(`/api/dress/${id}`);
         const data = await res.json();
         setOrderDress(data.dress);
      }
   };

   useEffect(() => {
      fetchData();
   }, [id]);

   const price = Math.floor(
      orderDress?.price - (orderDress?.price * orderDress?.discount) / 100
   );

   const total = price * quantity;
   const grandTotal = total + 100;

   const handleOrderSubmit = async () => {
      const orderData = {
         userId: currentUser?._id,
         dressName: orderDress?.name,
         userEmail: currentUser?.email,
         userName: currentUser?.userName,
         totalPrice: grandTotal,
         quantity: quantity,
      };
      try {
         setIsUploading(true);
         console.log(orderData);
         const res = await axios.post("/api/order", orderData);
         if (res.status === 200) {
            setIsUploading(false);
            router.push("/success");
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

   const handelEsewaPayOrder = async () => {
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
               dressName: orderDress?.name,
               userEmail: currentUser?.email,
               userName: currentUser?.userName,
               totalPrice: grandTotal,
               quantity: quantity,
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

   const handleClick = () => {
      if (currentUser) {
         handleOrderSubmit();
      } else {
         setShowLoginMessage(!showLoginMessage);
      }
   };

   const handelBuywithesewa = () => {
      if (currentUser) {
         handelEsewaPayOrder();
      } else {
         setShowLoginMessage(!showLoginMessage);
      }
   };
   return (
      <div className={paddingForCart}>
         {orderDress && orderDress ? (
            <div className="">
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
                           </tr>
                        </thead>
                        <tbody>
                           <tr
                              key={orderDress._id}
                              className="justify-center bg-gray-50 my-5 border-gray-200 border-2"
                           >
                              <td className="w-1/6">
                                 <div className=" w-full flex justify-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 overflow-hidden">
                                       <Image
                                          className="w-full h-full object-cover object-top"
                                          src={orderDress.image}
                                          alt="product image"
                                          width={50}
                                          height={50}
                                          priority={true}
                                          quality={40}
                                       />
                                    </div>
                                 </div>
                              </td>
                              <td className="text-center w-1/6">
                                 {orderDress.name}
                              </td>
                              <td className="text-center w-1/6">{price}</td>
                              <td className="text-center w-1/6 ">
                                 <div className=" flex w-full">
                                    <div
                                       className=" outline outline-1 font-semibold w-1/3 aspect-video flex justify-center items-center cursor-pointer"
                                       onClick={() => setQuantity(quantity - 1)}
                                    >
                                       -
                                    </div>
                                    <div className=" outline outline-1  w-1/3 aspect-video flex justify-center items-center">
                                       {" "}
                                       {quantity}
                                    </div>
                                    <div
                                       className=" outline outline-1 font-semibold w-1/3 aspect-video flex justify-center items-center cursor-pointer"
                                       onClick={() => setQuantity(quantity + 1)}
                                    >
                                       +
                                    </div>
                                 </div>
                              </td>
                              <td className="text-center w-1/6">
                                 {price * quantity}
                              </td>
                           </tr>
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
                           <p>Rs: {total}</p>
                        </div>
                        <div className=" flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                           <p>Shipping Cost</p>
                           <p>Rs: 100</p>
                        </div>
                        <div className=" flex justify-between px-2 font-medium sm:text-xl xl:text-2xl bg-gray-50 py-3 rounded-md">
                           <p>Grand Total:</p>
                           <p>Rs: {grandTotal}</p>
                        </div>
                     </div>
                     <div className="" onClick={handleClick}>
                        <button
                           className={`w-full bg-black text-white py-3 rounded-md outline outline-1 hover:bg-white hover:text-black font-semibold ${
                              isUploading ? "cursor-not-allowed" : ""
                           }`}
                        >
                           {isUploading ? (
                              <div className=" flex justify-center items-center px-3 py-">
                                 <span className="loaderrr"></span>
                              </div>
                           ) : (
                              "Cash on delivery"
                           )}
                        </button>
                        {showLoginMessage && (
                           <div className="">
                              <LoginMessage
                                 showLoginMessage={showLoginMessage}
                                 setShowLoginMessage={setShowLoginMessage}
                              />
                           </div>
                        )}
                     </div>
                     {/* button for esewa pay */}
                     <div className="" onClick={handelBuywithesewa}>
                        <button
                           type="submit"
                           className={`w-full bg-green-400 text-black py-3 rounded-md outline outline-1 hover:bg-white hover:text-black font-semibold ${
                              isUploading ? "cursor-not-allowed" : ""
                           }`}
                        >
                           {isUploading ? (
                              <div className=" flex justify-center items-center px-3 py-">
                                 <span className="loaderrr"></span>
                              </div>
                           ) : (
                              "Pay via Esewa"
                           )}
                        </button>
                        {showLoginMessage && (
                           <div className="">
                              <LoginMessage
                                 showLoginMessage={showLoginMessage}
                                 setShowLoginMessage={setShowLoginMessage}
                              />
                           </div>
                        )}
                     </div>
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
