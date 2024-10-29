import { getProviderDetails, providerGetReviews } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import Reviews from "@/app/components/provider/Reviews";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ProviderReviews() {
  const getSession = await getServerSession(authOptions);
  if (!getSession) return redirect("/login");
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const providerDetails = await getProviderDetails(user?.id);

  const reviews = await providerGetReviews(user?.id);
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <Reviews reviews={reviews} />
    </DashboardLayout>
  );
}
