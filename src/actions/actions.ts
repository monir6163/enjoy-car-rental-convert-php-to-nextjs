"use server";
import { CountryGetAllType, RegionGetAllType } from "../../types";
import prisma from "../prisma";

export async function getAllCountriesAsync(): Promise<CountryGetAllType[]> {
  try {
    const countries = await prisma.country.findMany();

    return countries as CountryGetAllType[];
  } catch (error) {
    throw new Error("Error while fetching countries");
  }
}

export async function getAllRegionsAsync(
  countryId?: string
): Promise<RegionGetAllType[]> {
  try {
    const regions = await prisma.region.findMany({
      where: {
        countryId: countryId ? countryId : undefined,
      },
    });
    // console.log(countryId);
    return regions as RegionGetAllType[];
  } catch (error) {
    throw new Error("Error while fetching regions");
  }
}
