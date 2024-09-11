"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Toast from "@/lib/Toast";
import { BookDashedIcon, LogOutIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = ({ user }: any) => {
  const router = useRouter();

  return (
    <div className="text-center">
      <Toast />
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
          <Image
            src={user?.image || "/user.png"}
            alt={user?.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem
            className="text-lg font-medium text-gray-600 cursor-pointer w-full
            hover:bg-gray-100 p-2 rounded transition duration-100 ease-in-out"
          >
            <Link
              href={"/"}
              className="flex items-center 
            "
            >
              <User size={15} className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-lg font-medium text-gray-600 cursor-pointer w-full
            hover:bg-gray-100 p-2 rounded transition duration-100 ease-in-out"
          >
            <Link href={"/"} className="flex items-center">
              <BookDashedIcon size={15} className="mr-2" />
              Booking
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-lg font-medium text-gray-600 rounded cursor-pointer hover:bg-gray-100 p-2 transition duration-100 ease-in-out"
            onClick={async () => {
              await signOut({ callbackUrl: "/" });
            }}
          >
            <div className="flex items-center">
              <LogOutIcon size={15} className="mr-2" />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;