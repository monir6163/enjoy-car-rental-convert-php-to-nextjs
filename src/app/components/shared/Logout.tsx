"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Logout = ({ user }: any) => {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
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
