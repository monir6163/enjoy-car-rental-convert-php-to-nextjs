"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const isLogin = false;

  return (
    <div>
      {isLogin ? (
        <button
          className={` bg-red-500 hover:bg-red-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className={` bg-green-500 hover:bg-green-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
