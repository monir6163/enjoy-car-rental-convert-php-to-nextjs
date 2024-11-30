import { getUserDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import { AccountLayout } from "@/app/components/my-account";
import ProfileComponent from "@/app/components/my-account/profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const user = session?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const userDetails = await getUserDetails(user?.email);
  return (
    <AccountLayout>
      <ProfileComponent userSession={session} userDetails={userDetails} />
    </AccountLayout>
  );
}
