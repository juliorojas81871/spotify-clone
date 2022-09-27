import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow the request if the following is true...
  // 1. Its a request for next-auth session & provider fetching
  // 2. the token exists
  // _next will check the path is good because middleware check every single request the server does
  if (
    pathname.includes("/api/") ||
    pathname.includes("_next") ||
    pathname === "favicon.ico" ||
    token
  ) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have a token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
