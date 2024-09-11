"use client";
import Link from "next/link";
import Profile from "./Profile";

const MauthButton = () => {
  return (
    <div className="text-center">
      <Profile />

      <Link
        href="/login"
        className={` red_btn hover:bg-red-600 transition duration-100 ease-in-out rounded text-white  px-3 py-2 text-lg font-medium cursor-pointer  `}
      >
        Login
      </Link>
    </div>
  );
};

export default MauthButton;
