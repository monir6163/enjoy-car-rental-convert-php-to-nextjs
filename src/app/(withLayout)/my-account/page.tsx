import { authOptions } from "@/app/auth";
import ProfileComponent from "@/app/components/my-account/profile";
import { getServerSession } from "next-auth";
import { AccountLayout } from "../../components/my-account";

export default async function MyAccount() {
  const session = await getServerSession(authOptions);
  return (
    <AccountLayout>
      <ProfileComponent session={session} />
    </AccountLayout>
  );
}
