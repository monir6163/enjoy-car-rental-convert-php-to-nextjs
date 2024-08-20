import Link from "next/link";
import Logout from "./Logout";

const MauthButton = async ({ user }: any) => {
  return (
    <div className="text-center">
      {user ? (
        <Logout user={user} />
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

export default MauthButton;
