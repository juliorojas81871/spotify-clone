import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow the request if the following is true...
  // 1. Its a request for next-auth session & provider fetching
  // 2. the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have a token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    console.log("Couldn't find token - sending to login");
    console.log(`Token: ${token}, pathname: ${pathname}`);
    return NextResponse.redirect("/login");
  }
}
