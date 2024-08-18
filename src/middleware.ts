import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/register";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI4OWQ3MjIxMjUxZmZlYzk0NDYzZjkiLCJlbWFpbCI6ImtyYWZzYW5hOTFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiYXZhdGFyIjp7InB1YmxpY19pZCI6ImVjb20vdXNlci96emZhY3o0eWRwN2RzcXlrYmZvayIsInVybCI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RkeHFsanJpdy9pbWFnZS91cGxvYWQvdjE3MjMzNzQ5NjIvZWNvbS91c2VyL3p6ZmFjejR5ZHA3ZHNxeWtiZm9rLmpwZyJ9LCJmdWxsbmFtZSI6IkFkbWluIiwiaWF0IjoxNzIzOTg0MTY0LCJleHAiOjE3MjM5ODc3NjR9.PFYFG_3n9TaY8f_QBWWB4yspjSqeRqxgmYrfefw3YKU";

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
