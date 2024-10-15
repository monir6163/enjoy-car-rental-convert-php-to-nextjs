import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import { getServerSession } from "next-auth";

export default async function page() {
  const getSession = await getServerSession(authOptions);
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const providerDetails = await getProviderDetails(user?.id);
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      page
    </DashboardLayout>
  );
}
