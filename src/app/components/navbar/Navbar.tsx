"use client";
import { useAuth } from "@/app/provider/AuthContext";
import ProfileSkeleton from "@/lib/skeleton/ProfileSkeleton";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "../shared/AuthButton";
import Container from "../shared/Container";
import Language from "../shared/Language";
import Logo from "../shared/Logo";
import NavItem from "./NavItem";

const navItems = [
  // { name: "Home", path: "/", current: false },
  { name: "Renter a Car", path: "/renter-car", current: false },
  { name: "About", path: "/about", current: false },
  { name: "Other Services", path: "/other-services", current: false },
  { name: "Faq", path: "/faq", current: false },
  { name: "Contact", path: "/contact", current: false },
];
export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <>
      {/* only desktop */}
      <nav className="hidden md:block fixed w-full h-[90px] bg-white shadow-md z-50 top-0">
        <Container>
          <div className="flex relative items-center justify-between py-3">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="grid gap-2">
              <div className="flex justify-between z-50">
                <Link href="/" className="flex items-center space-x-2">
                  <MapPin size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    Fieldcrest Rd 660 Avery Creek, NY 10301, USA
                  </span>
                </Link>
                <Link href="/" className="flex items-center space-x-2">
                  <Mail size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    info@googamania.com
                  </span>
                </Link>
                <Link href="/" className="flex items-center space-x-2">
                  <PhoneCall size={24} className="text-red-500" />{" "}
                  <span className="text-white font-medium text-base">
                    (646) 893-6694
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <NavItem path="/" label="Home" />
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    path={item.path}
                    label={item.name}
                    active={pathname === item.path}
                  />
                ))}
                <Language />
                {user === null ? (
                  <ProfileSkeleton />
                ) : (
                  <>
                    {user?.data ? (
                      <div className="space-x-4 border border-red-600 rounded-full">
                        <Image
                          src={user?.data?.avatar?.url}
                          alt={user?.data?.role}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <AuthButton />
                    )}
                  </>
                )}

                {/*<DashboardButton /> */}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
