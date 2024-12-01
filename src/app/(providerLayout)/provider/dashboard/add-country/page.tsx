import { getAllCountriesAsync } from "@/actions/actions";
import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import AddCountry from "@/app/components/provider/AddCountry";
import AddRegion from "@/app/components/provider/AddRegion";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const getSession = await getServerSession(authOptions);

  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: string;
  };
  if (!getSession || user?.role !== "provider") return redirect("/login");
  const providerDetails = await getProviderDetails(user?.id);
  const countries = await getAllCountriesAsync();
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <div className="flex gap-10">
        <AddCountry />
        <AddRegion countries={countries} />
      </div>
    </DashboardLayout>
  );
}
