import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

export async function POST(request: any) {
  const { email, password } = await request.json();

  try {
    await connectDB();
    const user = await User.findOne({
      email,
    });
    // console.log(user);
    //find is a very important method for login credential match

    if (user == null) {
      throw new Error("user not found");
    }
    const isMatched = bcrypt.compareSync(password, user.password); //the first parameter is the encrypted password, and the second is real password by user
    if (!isMatched) {
      throw new Error("Password does not match");
    } else {
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_KEY as string
      );
      console.log(token);

      // NextResponse--cookie

      const response = NextResponse.json({
        message: "login successful",
        success: true,
      });
      response.cookies.set("authToken", token);
      // referral link- https://nextjs.org/docs/app/api-reference/functions/next-response
      return response;
      // return NextResponse.json({ message: "login successful" }, { status: 200 });
    }
    // return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 501 }
    );
  }
}
