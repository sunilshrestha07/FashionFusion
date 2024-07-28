"use client";

import { LoginInterface } from "@/types/declareTypes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFail, loginSuccess } from "@/app/redux/UserSlice";

export default function LoginMessage() {
  const [formData, setFormData] = useState<LoginInterface>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handelLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/user/login", formData);
      if (res.status === 200) {
        router.push("/cart");
        setIsLoading(false);
        dispatch(loginSuccess(res.data.user));
        window.location.reload();
      }
    } catch (error: any) {
      setIsLoading(false);
      dispatch(loginFail(error));
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred during login"
        );
      } else {
        toast.error("An unknown error occurred during login");
      }
    }
  };

  return (
    <div className="">
       (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-transparent backdrop-blur-xl z-50">
          <div className="w-10/12 sm:w-1/2 xl:w-1/3 bg-gray-100 rounded-lg flex flex-col justify-center items-center py-4 relative">
            <div className="my-5">
              <p className="font-semibold text-4xl text-center">Hello there!</p>
              <p className="text-center font-medium">Login to your account</p>
            </div>
            <div className="w-10/12">
              <form onSubmit={handelLoginSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handelLoginChange}
                  placeholder="Email"
                  className="w-full p-2 rounded-md outline outline-2 outline-gray-500"
                />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handelLoginChange}
                  placeholder="Password"
                  className="w-full p-2 rounded-md outline outline-2 outline-gray-500"
                />
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className={`w-1/2 py-3 bg-black hover:bg-white text-white hover:text-black outline outline-black outline-1 font-semibold rounded-md ${isLoading ? "cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center px-3 py-">
                        <span className="loaderr"></span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <div className="w-full text-center">
                  <p>Or</p>
                  <div>
                    <Link href="/signup">
                      <p className="font-semibold opacity-80 cursor-pointer">Sign up</p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    </div>
  );
}
