import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Log Out Successful" },
      { status: 200 }
    );
    response.cookies.set("authToken", "", {
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error in Log Out" }, { status: 501 });
  }
}
