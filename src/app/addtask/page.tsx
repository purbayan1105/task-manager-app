"use client";

import MainPage from "@/components/MainPage";
import Navbar from "@/components/Navbar";
import login from "../../../public/login.svg";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { addTask } from "@/services/taskServices";
import { toast } from "react-toastify";

const page = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    userId: "66c363d51878b95722b832fc",
    status: "",
  });

  const handleClick = async () => {
    console.log(task);
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Task Added!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Task Not Aded", { position: "top-center" });
    }
  };
  return (
    <>
      <div className=" mx-8 py-5 flex justify-center items-center ">
        <div className="">
          <div className="">
            <Image src={login} alt="login-svg" className="w-32" />
          </div>
          <div className="text-2xl text-white font-semibold mt-5">
            Add Your Task Here!!
          </div>
          <div className="my-8 flex flex-col">
            <label htmlFor="" className="text-white">
              Title
            </label>
            <input
              type="text"
              className="max-w-[400px] bg-white rounded-lg px-2 py-1 "
              onChange={(e: any) => {
                setTask({ ...task, title: e.target.value });
              }}
              value={task.title}
            />
          </div>
          <div className="py-8 flex flex-col">
            <label htmlFor="" className="text-white">
              Content
            </label>
            <textarea
              className="max-w-[400px] bg-white rounded-lg px-2 py-1 min-h-8"
              onChange={(e: any) => {
                setTask({ ...task, content: e.target.value });
              }}
              value={task.content}></textarea>
          </div>
          <div className="my-8 flex flex-col">
            <label htmlFor="" className="text-white">
              Status
            </label>

            <select
              name=""
              id=""
              className="max-w-[400px] py-1 rounded-lg"
              onChange={(e: any) => {
                setTask({ ...task, status: e.target.value });
              }}>
              <option value="none" selected disabled>
                --Select Your Option--
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="just_added">Just added</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-green-600 text-white px-3 py-2 rounded-lg"
              onClick={handleClick}>
              Add To Do
            </button>
            <button className="bg-red-600 text-white px-3 py-2 rounded-lg">
              Clear
            </button>
          </div>
        </div>
      </div>
      <MainPage />
    </>
  );
};

export default page;
