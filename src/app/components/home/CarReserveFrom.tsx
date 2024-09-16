"use client";

import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import { Button } from "@mantine/core";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../cars/DatePicker";
import CarModel from "./filterFrom/CarModel";
import SelectCity from "./filterFrom/SelectCity";
import SelectCountry from "./filterFrom/SelectCountry";
const CarReserveFrom = () => {
  const {
    state: { selectedCountry, selectedRegion },
    setCountry,
    setRegion,
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

  return (
    <div className="carReservation">
      <div className="">
        <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
      </div>
      <form>
        <SelectCountry
          onChange={handleCountryChange}
          value={selectedCountry?.id}
        />
        <SelectCity
          onChange={handleRegionChange}
          value={selectedRegion?.id}
          countryId={selectedCountry?.id}
        />
        <CarModel />
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
