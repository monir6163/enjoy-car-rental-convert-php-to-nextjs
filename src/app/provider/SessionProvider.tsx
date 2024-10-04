"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
export default function Providers({
  session,
  children,
}: Readonly<{ session: any; children: React.ReactNode }>) {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
