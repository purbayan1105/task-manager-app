"use client";

import Headers from "@/components/Headers";
import MainPage from "@/components/MainPage";
import Navbar from "@/components/Navbar";
import UserContext from "@/context/userContext";
import UserProvider from "@/context/UserProvider";
import { connectDB } from "@/helper/db";

const page = () => {
  return (
    <>
      <Headers />
      <MainPage />
    </>
  );
};

export default page;
