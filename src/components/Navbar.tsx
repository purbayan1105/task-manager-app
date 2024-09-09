"use client";
import UserContext from "@/context/userContext";
import { logoutUser } from "@/services/userServices";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const context = useContext(UserContext) as any;
  console.log(context);

  const doLogout = () => {
    try {
      const result = logoutUser();
      console.log("log out successful");
      toast.success("Logout successful");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("log out failed");
    }
  };

  return (
    <>
      <div className="bg-blue-600 text-white grid grid-cols-3 px-8 py-2">
        <div className="text-xl font-bold">Work Manager</div>
        <div className="flex justify-center items-center gap-8">
          <div className="">Work</div>
          <Link href="/addtask">
            <div className="cursor-pointer">Add Tasks</div>
          </Link>
          <Link href="/showtasks">
            <div className="">Show Tasks</div>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-5">
          {context.user ? (
            <>
              {" "}
              <Link href="/Login">
                <div className="">{context.user.name}</div>
              </Link>
              <button onClick={doLogout}>
                <div className="">Log Out</div>
              </button>
            </>
          ) : (
            <>
              {" "}
              <Link href="/Login">
                <div className="">Log In</div>
              </Link>
              <Link href="/SignUp">
                <div className="">Sign Up</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
