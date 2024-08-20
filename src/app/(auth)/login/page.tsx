import LoginApp from "@/app/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();
  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="py-32  lg:px-10  min-h-[calc(100vh-90px)]">
      <LoginApp />
    </div>
  );
}
