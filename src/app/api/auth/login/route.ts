import axiosInstance from "@/lib/axiosInstance";
import { baseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axiosInstance.post(`${baseUrl}/users/login`, body);

    return NextResponse.json(response.data, {
      headers: {
        "Set-Cookie": response.headers["set-cookie"] || "",
      } as any,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
