"use client";

import UserContext from "@/context/userContext";
import { getDeleteTasks, getUserTasks } from "@/services/taskServices";
import { useContext, useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";

interface Task {
  _id: string;
  title: string;
  content: string;
  status: string;
}

const Page = () => {
  const [usertasks, setTasks] = useState<Task[]>([]);
  const context = useContext(UserContext) as any;

  async function loadTask(userId: string) {
    const getTasks = await getUserTasks(userId);
    console.log(getTasks.tasks);

    setTasks([...getTasks.tasks]);
  }
  useEffect(() => {
    if (context.user) {
      console.log(context.user._id);
      loadTask(context.user._id);
    }
  }, [context.user]);

  useEffect(() => {
    console.log(usertasks);
  }, [usertasks]);

  const deleteTaskHandle = async (taskid: any) => {
    try {
      await getDeleteTasks(taskid);
      toast.success("task deleted");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className=" space-y-5 py-5 bg-black w-[600px] flex flex-col mx-auto">
        {usertasks.map((tasks) => {
          return (
            <>
              <div
                key={tasks._id}
                className={` text-white p-3 flex items-center justify-between ${
                  tasks.status === "completed" ? "bg-green-500" : "bg-blue-500"
                }`}>
                <div className="">
                  {/* <div className="">{tasks._id}</div> */}
                  <div className="font-bold text-lg ">{tasks.title}</div>
                  <div className="text-md">{tasks.content}</div>
                  <div className="">{tasks.status}</div>
                </div>
                <button
                  className=""
                  onClick={() => {
                    deleteTaskHandle(tasks._id);
                  }}>
                  <MdOutlineCancel />
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;
