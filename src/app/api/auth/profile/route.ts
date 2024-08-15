import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { data } = await axios.get(`${baseUrl}/users/profile`);
    return NextResponse.json(data);
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: "user get failed" }, { status: 500 });
  }
}
