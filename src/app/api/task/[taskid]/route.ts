import { connectDB } from "@/helper/db";
import { errorMsg } from "@/helper/errorMsg";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  const { taskid } = params;
  try {
    await connectDB();
    const task = await Task.findById(taskid);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(errorMsg("task not found", 401, false));
  }
}

export async function PUT(request: any, { params }: any) {
  const { title, content } = await request.json();
  const { taskid } = params;
  try {
    await connectDB();
    const task = await Task.findById(taskid); // key is here..So, dont miss out. taskid is the id that mongoDB generates fir me.
    task.title = title;
    task.content = content;
    //
    const updatedTask = await task.save();
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(errorMsg("Error Occured", 401, false));
  }
}

export async function DELETE(request: any, { params }: any) {
  // const { title, content } = await request.json();
  const { taskid } = params;
  try {
    await connectDB();
    await Task.deleteOne({
      _id: taskid, // This is a method for mongo db,
    });
    return NextResponse.json({ result: "Task Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ result: "Error Occured" }, { status: 200 });
  }
}
