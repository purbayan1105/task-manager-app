import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const { userid } = params;

  try {
    await connectDB();
    let tasks = [];
    tasks = await Task.find({ userId: userid });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get tasks" },
      { status: 404 }
    );
  }
}
