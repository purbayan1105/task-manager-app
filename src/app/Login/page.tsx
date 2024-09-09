"use client";

import MainPage from "@/components/MainPage";
import Navbar from "@/components/Navbar";
import { loginUser } from "@/services/userServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const result = await loginUser(loginData);
      console.log(result);
      toast.success("login successful");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      //  router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const resetHandle = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="">
        <form action="" onSubmit={handleLogin}>
          <div className="flex flex-col justify-center items-center space-y-6 h-screen">
            <div className="text-3xl">Log In</div>
            <input
              type="email"
              name=""
              id=""
              value={loginData.email}
              placeholder="Enter Your Email"
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <input
              type="password"
              name=""
              id=""
              value={loginData.password}
              placeholder="Enter Your Password"
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <button className="bg-green-500 px-3 py-2 rounded-lg" type="submit">
              Log in
            </button>
            <button
              className="bg-yellow-500 px-3 py-2 rounded-lg"
              onClick={resetHandle}>
              Reset
            </button>
          </div>
        </form>
      </div>
      <MainPage />
    </>
  );
};

export default page;
