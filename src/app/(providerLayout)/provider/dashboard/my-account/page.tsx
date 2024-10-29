import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import MyAccount from "@/app/components/provider/MyAccount";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProviderMyAccount() {
  const getSession = await getServerSession(authOptions);
  if (!getSession) return redirect("/login");
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const providerDetails = await getProviderDetails(user?.id);
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <MyAccount user={user} providerDetails={providerDetails} />
    </DashboardLayout>
  );
}
