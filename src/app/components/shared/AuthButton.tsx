import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./Logout";

const AuthButton = async () => {
  const session = await getServerSession();
  return (
    <div className="text-center">
      {session?.user ? (
        <Logout user={session?.user} />
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
