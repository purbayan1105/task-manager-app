import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  console.log("authToken: ", authToken);
  //   // Now you need to extract data from the token
  if (!authToken) {
    return NextResponse.json({ message: "Token not found" }, { status: 501 });
  }

  try {
    const data = jwt.verify(authToken, process.env.JWT_KEY as string);
    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 501 });
  }
}

//postman will not show the data of authentication token becasuse, it does not have it. We are not setting any authToken here but just trying to get it.
