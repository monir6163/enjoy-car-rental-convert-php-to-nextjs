"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton = () => {
  const { data: session } = useSession();
  const isLogin = !!session?.user;
  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="text-center">
      {isLogin ? (
        <button
          className={` bg-red-500 hover:bg-red-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className={` red_btn hover:bg-red-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
