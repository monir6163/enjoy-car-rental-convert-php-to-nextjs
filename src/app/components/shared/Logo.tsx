import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex text-[40px] font-bold text-gray-800 cursor-pointer uppercase",
        className
      )}
    >
      <Image
        alt="Logo"
        width={180}
        height={180}
        className="mr-1 bg-slate-800 p-1 rounded-full"
        src="/images/googamanialogopng.png"
      />
    </Link>
  );
};

export default Logo;
