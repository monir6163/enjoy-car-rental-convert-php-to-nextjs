import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  //   * Get user from token
  const user: CustomUser | null = token?.user as CustomUser;

  // * Protected routes for user
  const userProtectedRoutes = ["/about"];

  // * Protected routes for admin
  const adminProtectedRoutes = ["/admin/dashboard"];

  if (
    token == null &&
    user == null &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route",
        request.url
      )
    );
  }

  // * if user try to access admin routes
  if (adminProtectedRoutes.includes(pathname) && user.role === "user") {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route.",
        request.url
      )
    );
  }

  //   * If Admin try to access user routes
  if (userProtectedRoutes.includes(pathname) && user.role === "admin") {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route.",
        request.url
      )
    );
  }

  //  * If user is already logged in and try to access login or register page
  if (pathname == "/login" || pathname == "/register") {
    if (token && user?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (token && user?.role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}
