import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const getSession = await getServerSession(authOptions);
  const user = getSession?.user as {
    role: string;
  };
  if (!getSession || user?.role !== "admin") {
    return redirect("/login");
  }

  return <div className="py-28">page</div>;
}
