"use client";
import { useAuth } from "@/app/provider/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileSkeleton from "@/lib/skeleton/ProfileSkeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "../shared/AuthButton";
import Container from "../shared/Container";
import Language from "../shared/Language";
import Logo from "../shared/Logo";
interface NavItemProps {
  label: string;
  active?: boolean;
  path: string;
  onClick?: () => void;
}
const navItems = [
  // { name: "Home", path: "/", current: false },
  { name: "Renter a Car", path: "/renter-car", current: false },
  { name: "About", path: "/about", current: false },
  { name: "Other Services", path: "/other-services", current: false },
  { name: "Faq", path: "/faq", current: false },
  { name: "Contact", path: "/contact", current: false },
];
export default function Mobile() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ path, label, active, onClick }: NavItemProps) => {
    return (
      <Link
        href={`${path}`}
        onClick={onClick}
        className={`text-gray-600 text-center hover:text-red-600 px-3 py-2 rounded-md text-lg font-medium cursor-pointer border-b-2 md:border-b-0 ${
          active ? "red_color" : "text-white md:text-gray-600"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* only mobile */}
      <div
        className={`absolute top-0 left-0 w-full z-50 md:hidden ${
          pathname === "/login" || pathname === "/register"
            ? "bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-10 w-10 ${
                    pathname === "/login" || pathname === "/register"
                      ? "text-black"
                      : "text-white"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent className="bg-[#0d0101]" id="content">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex-shrink-0">
                      <Logo />
                    </div>
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  <NavItem
                    path="/"
                    label="Home"
                    onClick={() => setIsOpen(false)}
                  />
                  {navItems.map((item) => (
                    <NavItem
                      key={item.name}
                      path={item.path}
                      label={item.name}
                      active={pathname === item.path}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                  <Language />
                  {user?.data ? (
                    <div className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
                          <div className="space-x-4 border border-red-600 rounded-full">
                            {user === null ? (
                              <ProfileSkeleton />
                            ) : (
                              <Image
                                src={
                                  user?.data?.avatar
                                    ? user?.data?.avatar?.url
                                    : "/images/demo.jpg"
                                }
                                alt={user?.data?.role}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem className="text-lg font-medium text-gray-600  cursor-pointer">
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-lg font-medium text-gray-600  cursor-pointer"
                          >
                            Logout
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <AuthButton />
                  )}
                  {/*<DashboardButton /> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>
    </>
  );
}
