import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { headers } = request;
  const cookie = headers.get("cookie");
  try {
    return NextResponse.json({ data: cookie }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
