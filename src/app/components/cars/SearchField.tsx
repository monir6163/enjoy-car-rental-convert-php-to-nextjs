import { Container, Flex } from "@mantine/core";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import CarModel from "../home/filterFrom/CarModel";
import SelectCountry from "../home/filterFrom/SelectCountry";
import SelectRegion from "../home/filterFrom/SelectRegion";
import DatePicker from "./DatePicker";
import styles from "./search.module.css";

export const SearchEngine = () => {
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
        <CarModel
          onChange={handleCarModelChange}
          value={carModel?.value}
          label={carModel?.label}
        />
        <DatePicker />
        {/* <PicupDate palceholder="Pickup Date" />
        <ReturnDate palceholder="Return Date" /> */}
        <Button type="submit" className="text-white rounded">
          Search for car
        </Button>
      </Flex>
    </Container>
  );
};
