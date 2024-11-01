"use server";

import prisma from "@/prisma";

// create a new booking
export const createBooking = async (data: any) => {
  try {
    const [booking, car] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          userId: data.userId,
          carId: data.carId,
          providerId: data.providerId,
          pickUpDate: data.pickupDate,
          returnDate: data.returnDate,
          totalPrice: data.totalPrice,
          status: data.status,
        },
      }),
      prisma.car.update({
        where: { id: data.carId },
        data: { status: data.status },
      }),
    ]);
    return { booking, car };
  } catch (error) {
    console.log(error);
    return { error: "Car Booking Failed" };
  }
};
