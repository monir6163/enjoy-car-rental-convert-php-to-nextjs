import { Container, Flex } from "@mantine/core";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import { carMakes } from "@/lib/data";
import {
  getDefaultSelectedCountry,
  getDefaultSelectedRegion,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SelectCarMake } from "../home/filterFrom/SelectCarMake";
import SelectCountry from "../home/filterFrom/SelectCountry";
import SelectRegion from "../home/filterFrom/SelectRegion";
import DatePicker from "./DatePicker";
import styles from "./search.module.css";

export const SearchEngine = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    state: {
      selectedCountry,
      selectedRegion,
      carMake,
      carModel,
      picupDate,
      returnDate,
    },
    setCountry,
    setRegion,
    setCarModel,
    setMake,
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
  const handleCarMakeChange = (value: string) => {
    const selectedMake = carMakes.filter((make) => make.value === value)[0];
    setMake(selectedMake);
  };
  const handleSearchCars = () => {
    if (
      selectedCountry &&
      selectedRegion &&
      carMake &&
      picupDate &&
      returnDate
    ) {
      const params = `country=${selectedCountry?.id}&region=${selectedRegion?.id}&carMake=${carMake?.value}&pickupDate=${picupDate}&returnDate=${returnDate}`;
      router.push(`/cars?${params}`);
    } else {
      toast.error("Please fill all fields");
    }
  };
  useEffect(() => {
    if (countries) {
      const countryId = searchParams.get("country");

      const selectedCountry = getDefaultSelectedCountry(countries, countryId);
      setCountry(selectedCountry);
    }
  }, [countries, searchParams, setCountry]);

  useEffect(() => {
    if (regions) {
      const regionId = searchParams.get("region");
      const selectedRegion = getDefaultSelectedRegion(regions, regionId);
      setRegion(selectedRegion);
    }
  }, [regions, searchParams, setRegion]);

  useEffect(() => {
    const makeParam = searchParams.get("carMake");
    if (makeParam) {
      const selectedMake = carMakes.filter(
        (make) => make.value === makeParam
      )[0];
      setMake(selectedMake);
    }
  }, [searchParams, setMake]);

  useEffect(() => {
    const pickupParam = searchParams.get("pickupDate");
    if (pickupParam) {
      const date = new Date(pickupParam);
      setPicupDate(date);
    }
  }, [searchParams, setPicupDate]);

  useEffect(() => {
    const returnParam = searchParams.get("returnDate");
    if (returnParam) {
      const date = new Date(returnParam);
      setReturnDate(date);
    }
  }, [searchParams, setReturnDate]);

  return (
    <Container className={styles.container} size="100%">
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="center"
        gap={{ base: "sm", sm: "lg" }}
        align={{
          base: "stretch",
          sm: "flex-end",
        }}
      >
        <SelectCountry
          onChange={handleCountryChange}
          value={selectedCountry?.id}
        />
        <SelectRegion
          onChange={handleRegionChange}
          value={selectedRegion?.id}
          countryId={selectedCountry?.id}
        />
        <SelectCarMake
          value={carMake?.value}
          onChange={handleCarMakeChange}
          label=""
        />
        <DatePicker />
        {/* <PicupDate palceholder="Pickup Date" />
        <ReturnDate palceholder="Return Date" /> */}
        <Button
          type="submit"
          className="text-white rounded"
          onClick={handleSearchCars}
        >
          Search for car
        </Button>
      </Flex>
    </Container>
  );
};
