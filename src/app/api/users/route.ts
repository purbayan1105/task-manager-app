import { User } from "@/models/user";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/helper/db";

export async function GET(request: any) {
  try {
    await connectDB();
    let Users = [];
    Users = await User.find().select("-password");
    // Users = await User.find();
    return NextResponse.json({ Users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ result: "Error Occured" }, { status: 500 });
  }
}

export async function POST(request: any) {
  try {
    const { name, email, password, about, profileURL } = await request.json();

    const user = new User({
      name,
      email,
      password,
      about,
      profileURL,
    });
    user.password = bcrypt.hashSync(user.password, 10);
    await connectDB();
    const saveUser = await user.save();
    return NextResponse.json(saveUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create an user" },
      { status: 500 }
    );
  }
}
