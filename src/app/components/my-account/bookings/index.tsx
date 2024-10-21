"use client";

import { ghCurrency } from "@/const";
import { formatDate } from "@/lib/utils";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Table,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StatusRenderer } from "../../StatusRenderer";

interface BookingsProps {
  userId: string;
  bookings: any[];
}
const header = (
  <Table.Tr>
    <Table.Th>Date Booked</Table.Th>
    <Table.Th>Car</Table.Th>
    <Table.Th>Pickup Date</Table.Th>
    <Table.Th>Return Date</Table.Th>
    <Table.Th>Price</Table.Th>
    <Table.Th>Status</Table.Th>
  </Table.Tr>
);
export default function Bookings({ userId, bookings }: BookingsProps) {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car_id");
  const rows = bookings?.map((item) => (
    <TableRow
      key={item.id}
      bookingId={item.id}
      carId={carId}
      dateBooked={new Date(item.created_at)}
      car={item.cars as any}
      pickupDate={new Date(item.pickupDate)}
      returnDate={new Date(item.returnDate)}
      price={item.totalPrice}
      status={item.status as any}
    />
  ));
  return bookings.length > 0 ? (
    <>
      <Divider
        mb="lg"
        labelPosition="left"
        label={
          <Title order={1} className="text-default" mb="lg">
            My Bookings ({bookings.length})
          </Title>
        }
      />

      <Box mah="310px" style={{ overflowY: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>{header}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  ) : (
    <Card my="3rem">
      <Text fs="italic" ta="center">
        No Bookings Found
      </Text>
    </Card>
  );
}

interface TableRowProps {
  bookingId: string;
  carId: string | null;
  dateBooked: Date;
  car: { slug: string; make: string; model: string; images: string[] };
  pickupDate: Date;
  returnDate: Date;
  price: number;
  status: string;
}
export const TableRow = ({
  dateBooked,
  car,
  pickupDate,
  returnDate,
  price,
  status,
}: TableRowProps) => {
  return (
    <Table.Tr>
      <Table.Td>{formatDate(dateBooked)}</Table.Td>
      <Table.Td>
        <Flex align="center" gap={4}>
          <Avatar size="sm" radius="xl" src={car.images[0]} />

          <Text component={Link} href={`/cars/${car.slug}`}>
            {car.make} {car.model}
          </Text>
        </Flex>
      </Table.Td>
      <Table.Td>{formatDate(pickupDate)}</Table.Td>
      <Table.Td>{formatDate(returnDate)}</Table.Td>
      <Table.Td>
        {ghCurrency} {price}
      </Table.Td>
      <Table.Td width="100px">
        <StatusRenderer status={status} />
      </Table.Td>
    </Table.Tr>
  );
};
