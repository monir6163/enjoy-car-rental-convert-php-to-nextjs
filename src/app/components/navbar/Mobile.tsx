"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import AuthButton from "../shared/AuthButton";
import Container from "../shared/Container";
import Language from "../shared/Language";
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
export default function Mobile() {
  const pathname = usePathname();
  // when i click about, close the menu and navigate to about

  return (
    <>
      {/* only mobile */}
      <div className="absolute top-0 left-0 w-full z-50 bg-transparent md:hidden">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <Sheet>
              <SheetTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
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
                  {navItems.map((item) => (
                    <NavItem
                      key={item.name}
                      path={item.path}
                      label={item.name}
                      active={pathname === item.path}
                    />
                  ))}
                  <Language />
                  <AuthButton />
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
