"use server";

import { isValidCarDetails } from "@/app/components/provider/isValidCarDetails";
import prisma from "@/prisma";
import slugify from "react-slugify";
import { IReqCarProps } from "../../types";

//get provider car with providerid
export const getProviderCars = async (providerId: string) => {
  try {
    const providerCars = await prisma.car.findMany({
      where: { providerId: providerId },
      include: {
        images: true,
        otherFeatures: true,
      },
    });
    return providerCars;
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to get cars" };
  }
};

//add provider car
export const addCar = async (carDetails: IReqCarProps) => {
  try {
    const { isValid, message } = isValidCarDetails(carDetails);
    if (isValid) {
      let slugTitle =
        carDetails.make + " " + carDetails.model + " " + carDetails.year;

      // Validate foreign keys
      const providerExists = await prisma.provider.findUnique({
        where: { id: carDetails.provider_id },
      });
      const countryExists = await prisma.country.findUnique({
        where: { id: carDetails.country_id },
      });
      const regionExists = await prisma.region.findUnique({
        where: { id: carDetails.region_id },
      });

      if (!providerExists || !countryExists || !regionExists) {
        return {
          error: "The specified provider, country, or region does not exist.",
        };
      }

      const car = await prisma.car.create({
        data: {
          description: carDetails.description,
          slug: slugify(slugTitle),
          bodyType: carDetails.type,
          make: carDetails.make,
          model: carDetails.model,
          year: carDetails.year,
          transmission: carDetails.transmission,
          engineCapaciy: carDetails.engineCapacity,
          fuelType: carDetails.fuelType,
          seatsCapacity: carDetails.seatingCapacity,
          doorsCapacity: carDetails.numberOfDoors,
          bagsCapacity: carDetails.numberOfBags,
          acAvailable: carDetails.acAvailable,
          acWorking: carDetails.acWorking,
          pricePerDay: carDetails.pricePerDay,
          minimumRent: carDetails.minimumRentalPeriodInDays,
          maximumRent: carDetails.maximumRentalPeriodInDays,
          color: carDetails.color,
          countryId: carDetails.country_id,
          regionId: carDetails.region_id,
          providerId: carDetails.provider_id,
          images: {
            create: carDetails.images.map((image) => ({
              imageUrl: image,
            })),
          },
          otherFeatures: {
            create: carDetails.otherFeatures.map((feature) => ({
              feature: feature,
            })),
          },
        },
      });

      return { message: "Car added successfully" };
    }
    return { error: message };
  } catch (error: any) {
    console.log("Error:", error);
    return { error: "Car added Faield" };
  }
};

//status update provider car
export const updateCarStatus = async (carId: number, status: string) => {
  try {
    const car = await prisma.car.update({
      where: { id: carId },
      data: { status: status },
    });
    return { data: car, message: "Car status updated successfully" };
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to update car status" };
  }
};

//delete provider car
export const deleteCar = async (carId: number) => {};
