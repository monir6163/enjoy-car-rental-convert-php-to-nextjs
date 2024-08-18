"use server";
import { cookies } from "next/headers";

const refreshTokenOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
} as const;

const accessTokenOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  //2 minutes
  expires: new Date(Date.now() + 1000 * 60 * 2), // 2 minutes
} as const;

export const removeCookie = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCookie = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  return { accessToken, refreshToken };
};

export const setCookie = (accessToken: string, refreshToken: string) => {
  cookies().set("accessToken", accessToken, accessTokenOptions);
  cookies().set("refreshToken", refreshToken, refreshTokenOptions);
};
