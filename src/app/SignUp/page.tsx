"use client";

import { useState } from "react";
// import { toast } from "react-toastify";
import { addUsers } from "@/services/userServices";
import { connectDB } from "@/helper/db";
import { toast } from "react-toastify";

const page = () => {
  connectDB();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    profileUrl: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.profileUrl === "" ||
      user.about === ""
    ) {
      return toast.warning("Please enter valid input");
    }

    if (user.confirmPassword !== user.password) {
      return toast.warning("password does not match");
    }

    // if (user.password.length < 4) {
    //   return toast.warning("Password length must be 4");
    // }

    try {
      const addUser = await addUsers(user);
      console.log(addUser);
      toast.success("User is registered", { position: "top-center" });
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error("Error", { position: "top-center" });
      console.log("error occured");
    }

    // console.log(name, email, password, confirmPassword, msg);
  };

  const resetHandle = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      profileUrl: "",
    });

    toast.done("Input reset");
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="">
          <div className="flex flex-col space-y-6  justify-center items-center h-screen border-2 border-solid border-indigo-600 px-2 py-2">
            <div className="text-3xl flex justify-center mt-5">
              Sign Up Form
            </div>
            <input
              type="text"
              name=""
              id=""
              value={user.name}
              placeholder="Enter Your Name"
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              name=""
              id=""
              value={user.email}
              placeholder="Enter Your Email"
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              name=""
              id=""
              value={user.password}
              placeholder="Enter Your password"
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) =>
                setUser({ ...user, password: e.target.value })
              }
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Your password"
              value={user.confirmPassword}
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <textarea
              name=""
              id=""
              placeholder="Write about yourself"
              className="border-2 border-solid border-indigo-600 p-2"
              value={user.about}
              onChange={(e: any) =>
                setUser({ ...user, about: e.target.value })
              }></textarea>
            <input
              type="text"
              name=""
              id=""
              placeholder="provide profile url"
              value={user.profileUrl}
              className="border-2 border-solid border-indigo-600 p-2"
              onChange={(e: any) =>
                setUser({ ...user, profileUrl: e.target.value })
              }
            />
            <button className="px-3 py-2 bg-green-500 rounded-lg" type="submit">
              Sign Up
            </button>
            <button
              className="px-3 py-2 bg-yellow-500 rounded-lg"
              onClick={resetHandle}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default page;
