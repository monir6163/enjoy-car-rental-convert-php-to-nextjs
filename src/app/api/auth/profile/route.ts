import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { headers } = request;
  const cookie = headers.get("cookie");
  try {
    const response = await axios.get(`${baseUrl}/users/profile`, {
      withCredentials: true,
      headers: { cookie },
    });
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
