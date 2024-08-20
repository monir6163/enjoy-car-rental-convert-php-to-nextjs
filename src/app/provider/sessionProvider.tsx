"use client";

import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
export default function Providers({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
