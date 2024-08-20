import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/register";
  const token = await getToken({
    req,
    secret: authOptions.secret,
  });
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(
      new URL(
        "/login?callbackUrl=" + req.nextUrl.pathname,
        req.nextUrl.origin
      ).toString()
    );
  }
}

export const config = {
  matcher: ["/login", "/register", "/about", "/contact"],
};
