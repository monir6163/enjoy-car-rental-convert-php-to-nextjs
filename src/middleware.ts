import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/provider/:path*",
    "/admin/:path*",
    "/my-account/:path*",
    "/cars/[slug]/:path*",
  ],
};
