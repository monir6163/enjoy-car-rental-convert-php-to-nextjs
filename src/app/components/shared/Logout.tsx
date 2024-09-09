"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Logout = ({ user }: any) => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.push("/login");
    }, 500);
    // window.location.href = "/";
  };
  return (
    <div className="text-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
          <Image
            src="/images/demo.jpg"
            alt={session?.user?.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem className="text-lg font-medium text-gray-600  cursor-pointer">
            {session?.user?.role === "admin" ? (
              <Link href="/admin/dashboard">Profile</Link>
            ) : (
              <Link href="/profile">Profile</Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-lg font-medium text-white bg-red-600 rounded cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Logout;
