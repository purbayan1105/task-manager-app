import { errorMsg } from "@/helper/errorMsg";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

export async function GET(request: any) {
  try {
    await connectDB();
    let tasks = [];
    tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(errorMsg("Error Occured", 404, false));
  }
}

// Post Method
export async function POST(request: any) {
  const { title, content, userId, status } = await request.json();

  const authToken = request.cookies.get("authToken")?.value;
  console.log("authToken: ", authToken);

  const data = jwt.verify(authToken, process.env.JWT_KEY as string) as any;
  console.log({ data });

  try {
    const task = new Task({
      title,
      content,
      userId: data._id,
      status,
    });
    await connectDB();
    const createdTask = await task.save();
    return NextResponse.json(createdTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create" }, { status: 501 });
  }
}
