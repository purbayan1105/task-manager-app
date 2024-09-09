import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(request: any, { params }: any) {
  const { userid } = params;
  try {
    await connectDB();
    await User.deleteOne({
      _id: userid, // This is a method for mongo db,
    });
    return NextResponse.json({ result: "User Deleted for testing." });
  } catch (error) {
    return NextResponse.json({ result: "Delete Failed." });
  }
}

//
export async function PUT(request: any, { params }: any) {
  const { userid } = params;
  const { name, password, about } = await request.json();
  try {
    const user = await User.findById(userid);
    user.name = name;
    user.password = password;
    user.about = about;

    await connectDB();
    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ mesage: "Failed" }, { status: 200 });
  }
}
