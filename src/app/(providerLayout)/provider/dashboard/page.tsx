import { getProviderDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import { CarStats } from "@/app/components/provider/CarStats";
import DashboardLayout from "@/app/components/provider/DashboardLayout";
import Stats from "@/app/components/provider/Stats";
import {
  IconAlertCircle,
  IconCar,
  IconMessage2,
  IconUsers,
} from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const getSession = await getServerSession(authOptions);
  if (!getSession) return redirect("/login");
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const providerDetails = await getProviderDetails(user?.id);

  const data = [
    {
      title: "Requests",
      icon: <IconAlertCircle />,
      value: "0",
    },
    {
      title: "Total Cars",
      icon: <IconCar />,
      value: "0",
    },

    {
      title: "Total Reviews",
      icon: <IconMessage2 />,
      value: "0",
    },

    {
      title: "My Users",
      icon: <IconUsers />,
      value: "0",
    },
  ];
  return (
    <DashboardLayout user={user} providerDetails={providerDetails}>
      <Stats data={data} />
      <CarStats />
    </DashboardLayout>
  );
}
