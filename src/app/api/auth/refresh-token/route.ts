import axiosInstance from "@/lib/axiosInstance";
import { getCookie } from "@/lib/getCookies";
import { baseUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = await getCookie();
  // console.log(cookie?.refreshToken?.value);
  try {
    const response = await axiosInstance.post(
      `${baseUrl}/users/refresh-token`,
      {
        refreshToken: cookie?.refreshToken?.value,
      }
    );
    return NextResponse.json(response.data, {
      headers: {
        "Set-Cookie": response.headers["set-cookie"] || "",
      } as any,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
