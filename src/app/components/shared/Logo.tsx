"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "inline-flex text-[40px] font-bold text-gray-800 cursor-pointer uppercase",
        className
      )}
      onClick={() => router.push("/")}
    >
      <Image
        alt="Logo"
        width={80}
        height={80}
        className="mr-1"
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
