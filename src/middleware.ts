import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware executed");
  const authToken = request.cookies.get("authToken")?.value;
  console.log(authToken);

  const loggedinusersnotaccessPath =
    request.nextUrl.pathname === "/Login" ||
    request.nextUrl.pathname === "/SignUp";

  if (loggedinusersnotaccessPath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/addtask", request.url));
    }
  }

  const addTaskaccessuser = request.nextUrl.pathname === "/addtask";
  if (addTaskaccessuser) {
    if (authToken == undefined) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  // const userAccessApi = request.nextUrl.pathname.startsWith("/api");
  // if (userAccessApi) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/addtask", "/api/:path*", "/Login", "/SignUp"],
};
