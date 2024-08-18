import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/register";

  const token = request.cookies.get("token")?.value;
  console.log("token", token);

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL("/", request.nextUrl.origin).toString()
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("/login", request.nextUrl.origin).toString()
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about", "/login", "/register"],
};
