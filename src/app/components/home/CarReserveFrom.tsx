"use client";

import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../cars/DatePicker";
import CarModel from "./filterFrom/CarModel";
import SelectCountry from "./filterFrom/SelectCountry";
import SelectRegion from "./filterFrom/SelectRegion";
const CarReserveFrom = () => {
  const router = useRouter();
  const {
    state: { selectedCountry, selectedRegion, carModel, picupDate, returnDate },
    setCountry,
    setRegion,
    setCarModel,
    setPicupDate,
    setReturnDate,
  } = useAppContext();
  const { countries } = useCountries();
  const { regions } = useRegions(selectedCountry?.id);

  const handleCountryChange = (value: string | null) => {
    if (countries) {
      const country = countries?.filter((country) => country.id === value)[0];
      setCountry(country);
    }
  };

  const handleRegionChange = (value: string | null) => {
    if (regions) {
      const region = regions?.filter((region) => region.id === value)[0];
      setRegion(region);
    }
  };

  const handleCarModelChange = (value: string | null) => {
    const carModel = { label: value || "", value: value || "" };
    setCarModel(carModel);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //navigate to the cars page with the url query params
    const url = `/cars?country=${selectedCountry?.name}&region=${selectedRegion?.name}&carModel=${carModel?.value}&pickupDate=${picupDate}&returnDate=${returnDate}`;
    router.push(url);
  };

  return (
    <div className="carReservation">
      <div className="">
        <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
      </div>
      <form onSubmit={handleSearch}>
        <SelectCountry
          onChange={handleCountryChange}
          value={selectedCountry?.id}
        />
        <SelectRegion
          onChange={handleRegionChange}
          value={selectedRegion?.id}
          countryId={selectedCountry?.id}
        />
        <CarModel
          onChange={handleCarModelChange}
          value={carModel?.value}
          label={carModel?.label}
        />
        <DatePicker />
        <div className="buttons">
          <Button type="submit" variant="gradient" className="w-full" size="md">
            Search for car
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarReserveFrom;
