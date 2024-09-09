import UserContext from "@/context/userContext";
import { httpAxios } from "@/helper/httpHelper";
import { useContext } from "react";

export async function addTask(userid: any) {
  const result = await httpAxios
    .post("/api/task", userid)
    .then((response) => response.data);
  return result;
}

export async function getUserTasks(userid: string) {
  const result = await httpAxios
    .get(`/api/users/${userid}/usertasks`)
    .then((response) => response.data);
  return result;
}

export async function getDeleteTasks(taskid: string) {
  try {
    const response = await httpAxios.delete(`/api/task/${taskid}`);
    return response.data;
  } catch (error: any) {
    console.error("Error occurred:", error);
  }
}
