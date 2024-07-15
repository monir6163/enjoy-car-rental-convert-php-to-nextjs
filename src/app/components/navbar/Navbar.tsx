"use client";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "../shared/AuthButton";
import Container from "../shared/Container";
import DashboardButton from "../shared/DashboardButton";
import Logo from "../shared/Logo";
import NavItem from "./NavItem";
const navItems = [
  { name: "Home", path: "/", current: false },
  { name: "Renter a Car", path: "/renter-car", current: false },
  { name: "About", path: "/about", current: false },
  { name: "Other Services", path: "/other-services", current: false },
  { name: "Faq", path: "/faq", current: false },
  { name: "Contact", path: "/contact", current: false },
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed w-full h-[90px] bg-white shadow-md z-50 top-0">
      <Container>
        <div className="flex relative items-center justify-between py-3">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:grid gap-2">
            <div className="flex justify-between z-50">
              <Link href="/" className="flex items-center space-x-2">
                <MapPin size={24} className="text-red-500" />{" "}
                <span className="text-white font-medium text-base">
                  Šuranj bb., 85330 Kotor, Montenegro
                </span>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <Mail size={24} className="text-red-500" />{" "}
                <span className="text-white font-medium text-base">
                  info@enjoyrentacar.me
                </span>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <PhoneCall size={24} className="text-red-500" />{" "}
                <span className="text-white font-medium text-base">
                  +382 69 576 000
                </span>
              </Link>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  path={item.path}
                  label={item.name}
                  active={pathname === item.path}
                />
              ))}
              <AuthButton />
              <DashboardButton />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
