import { getBookingDetails } from "@/actions/auth";
import { authOptions } from "@/app/auth";
import { AccountLayout } from "@/app/components/my-account";
import Bookings from "@/app/components/my-account/bookings";
import { getServerSession } from "next-auth";

export default async function BookingPage() {
  const getSession = await getServerSession(authOptions);
  const user = getSession?.user as {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
  const bookings = (await getBookingDetails(user?.id)) || [];
  return (
    <AccountLayout>
      {bookings.length > 0 ? (
        <Bookings userId={user?.id} bookings={bookings} />
      ) : (
        <Bookings userId={user?.id} bookings={[]} />
      )}
    </AccountLayout>
  );
}
