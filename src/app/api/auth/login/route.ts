import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${baseUrl}/users/login`, body, {
      withCredentials: true,
    });

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
