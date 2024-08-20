import { getServerSession } from "next-auth";
import MobileNavItem from "./MobileNavItem";

export default async function Mobile() {
  const session = await getServerSession();
  return <MobileNavItem user={session?.user} />;
}
