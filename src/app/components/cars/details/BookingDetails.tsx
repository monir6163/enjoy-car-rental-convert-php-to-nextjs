"use client";
import { createBooking } from "@/actions/bookings";
import { ghCurrency, primaryGradient } from "@/const";
import { useAppContext } from "@/context/AppContext";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Notification,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "../DatePicker";
import classes from "./styles.module.css";

export default function BookingDetails({ carDetails, user }: any) {
  const {
    state: { picupDate, returnDate },
    setPicupDate,
    setReturnDate,
  } = useAppContext();
  const { refresh } = useRouter();

  const [numOfDays, setNumOfDays] = useState<number | "">(
    carDetails.minimumRent
  );
  const [profileError, setProfileError] = useState<string | undefined>(
    undefined
  );
  const [triggered, setTriggered] = useState(false);

  const handleBookNow = async () => {
    setTriggered(true);
    if (
      !user?.userProfile?.firstName ||
      !user?.userProfile?.lastName ||
      !user?.userProfile?.city ||
      !user?.userProfile?.region.name
    ) {
      setProfileError("Please Complete your profile to book");
      return;
    }

    if (!picupDate || !returnDate) {
      return;
    }

    const data = {
      carId: carDetails.id,
      userId: user.id,
      providerId: carDetails.providerId,
      pickupDate: picupDate,
      returnDate: returnDate,
      totalPrice: carDetails.pricePerDay * Number(numOfDays),
      status: "pending",
    };
    const res = await createBooking(data);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Booking Created Successfully");
    refresh();
  };
  return (
    <Card
      w={{ base: "100%", md: "350px", lg: "400px" }}
      withBorder
      className={classes.bookingContainer}
    >
      <Title order={4} mb="md" c="gray.6">
        Booking Details
      </Title>
      <Flex gap="sm" direction={{ base: "column", sm: "row" }}>
        <Box>
          <DatePicker triggered={triggered} />
        </Box>
      </Flex>

      <Box my="md">
        <Title order={5} my="xs" className="text-muted">
          Address/Location
        </Title>
        <Text size="sm" className="text-default">
          Country:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.country?.name || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          Region:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.region?.name || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text my="sm" size="sm" className="text-default">
          City:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.city || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        <Text size="sm" className="text-default">
          Street:
          <Text c="gray.6" component="span" mx="xs">
            {user?.userProfile?.state || (
              <Link href="/my-account/profile">Add</Link>
            )}
          </Text>
        </Text>
        {profileError && (
          <Notification icon={<IconX size="0.6rem" />} c="red" title="Bummer!">
            {profileError}
          </Notification>
        )}
      </Box>

      <Title order={5} my="xs" className="text-muted">
        Rental Info
      </Title>
      <Box className={classes.rentalInfo} py="xs" px="md">
        <Flex justify="space-between">
          <Text className="text-default">Minimum Rental Days</Text>
          <Text className="text-default">{carDetails.minimumRent}</Text>
        </Flex>

        {carDetails.maximumRent && (
          <Flex justify="space-between" py="sm">
            <Text className="text-default">Maximum Rental Days</Text>
            <Text className="text-default">{carDetails.maximumRent}</Text>
          </Flex>
        )}

        <Flex justify="space-between">
          <Text className="text-default">Price Per Day</Text>
          <Text className="text-default">
            {ghCurrency} {carDetails.pricePerDay}
          </Text>
        </Flex>

        <Divider my="sm" />
        <Box>
          <Text className="text-default">Number of Days</Text>
          <NumberInput
            min={carDetails.minimumRent || undefined}
            max={carDetails.maximumRent || undefined}
            value={numOfDays}
            onChange={(value) => setNumOfDays(Number(value))}
          />
        </Box>

        <Divider my="md" />

        <Flex justify="space-between">
          <Text className="text-default">Total Price</Text>
          {numOfDays && (
            <Text fw="bold" className="text-default">
              {ghCurrency} {numOfDays * carDetails.pricePerDay}
            </Text>
          )}
        </Flex>
      </Box>

      <Button
        w="100%"
        my="sm"
        variant="gradient"
        gradient={primaryGradient}
        disabled={carDetails.status !== "available"}
        onClick={handleBookNow}
      >
        Book Now
      </Button>
    </Card>
  );
}
