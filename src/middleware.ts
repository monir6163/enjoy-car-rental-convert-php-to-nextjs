import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  const user: CustomUser | null = token?.user as CustomUser;

  // * Protected routes for user
  const userProtectedRoutes = [""];

  // * Protected routes for admin
  const adminProtectedRoutes = ["/admin/dashboard"];

  // * If no token or user exists and user/admin tries to access protected routes
  if (
    !token &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set(
      "error",
      "Please login first to access this route"
    );
    return NextResponse.redirect(redirectUrl);
  }

  // * If user tries to access admin routes
  if (adminProtectedRoutes.includes(pathname) && user?.role === "user") {
    return NextResponse.redirect(
      new URL("/login?error=You do not have access to this route.", request.url)
    );
  }

  // * If user or admin tries to access login or register page while logged in
  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      if (user?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (user?.role === "user") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  // * If no special condition applies, proceed to the next handler
  return NextResponse.next();
}
