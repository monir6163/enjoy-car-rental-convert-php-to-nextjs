"use server";
import { cookies } from "next/headers";

export const getCookie = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  return { accessToken, refreshToken };
};
