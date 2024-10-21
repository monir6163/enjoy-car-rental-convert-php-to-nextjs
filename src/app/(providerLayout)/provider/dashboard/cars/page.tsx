import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import Cars from "@/app/components/provider/Cars";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import { getServerSession } from "next-auth";

export default async function ProviderCars() {
  const getSession = await getServerSession(authOptions);
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const providerDetails = await getProviderDetails(user?.id);
  const cars = providerDetails?.cars;
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <Cars cars={cars} providerDetails={providerDetails} />
    </DashboardLayout>
  );
}
