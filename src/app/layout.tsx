import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { AppContextProvider } from "@/context/AppContext";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Barlow_Condensed } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import Providers from "./provider/SessionProvider";

export const metadata: Metadata = {
  title: "Car Rental App",
  description: "Generated by create next app",
};
// font-family: 'Barlow Condensed', sans-serif;
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.className} w-full h-full m-0 p-0 overflow-x-hidden`}
      >
        <ReactQueryProvider>
          <Providers session={session}>
            <AppContextProvider>
              <MantineProvider>
                <NextTopLoader />
                <ToastContainer position="bottom-right" theme="colored" />
                <main>{children}</main>
              </MantineProvider>
            </AppContextProvider>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
