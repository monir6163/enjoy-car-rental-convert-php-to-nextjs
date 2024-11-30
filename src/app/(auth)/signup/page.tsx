import { authOptions } from "@/app/auth";
import SignupApp from "@/app/components/auth/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const getSession = await getServerSession(authOptions);
  if (getSession) {
    return redirect("/");
  }
  return (
    <div className="py-32  lg:px-10  min-h-[calc(100vh-90px)]">
      <SignupApp />
    </div>
  );
}
