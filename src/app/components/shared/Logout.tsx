"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Logout = ({ user }: any) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    router.push("/");
  };
  return (
    <div className="text-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
          {user.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem className="text-lg font-medium text-gray-600  cursor-pointer">
            Profile
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
