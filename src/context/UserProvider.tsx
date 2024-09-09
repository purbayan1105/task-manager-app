"use client";
import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "@/services/userServices";
import { toast } from "react-toastify";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const loggedUser = await currentUser();
        // console.log(loggedUser);

        setUser({ ...loggedUser });
        // toast.success("Logged in as current user");
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
