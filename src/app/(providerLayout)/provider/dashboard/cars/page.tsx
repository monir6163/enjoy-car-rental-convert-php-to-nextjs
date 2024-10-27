import { getProviderDetails } from "@/actions/auth";
import { getProviderCars } from "@/actions/carAction";
import { authOptions } from "@/app/auth";
import Bookings from "@/app/components/provider/Bookings";
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
  const cars = await getProviderCars(providerDetails?.Provider[0].id);
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      {providerDetails && (
        <>
          <Cars cars={cars} providerDetails={providerDetails?.Provider[0]} />
          <Bookings providerId={providerDetails?.Provider[0]?.id} />
        </>
      )}
    </DashboardLayout>
  );
}
