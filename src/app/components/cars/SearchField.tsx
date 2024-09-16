import { Button, Container, Flex } from "@mantine/core";

import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import CarModel from "../home/filterFrom/CarModel";
import SelectCity from "../home/filterFrom/SelectCity";
import SelectCountry from "../home/filterFrom/SelectCountry";
import DatePicker from "./DatePicker";
import styles from "./search.module.css";

export const SearchEngine = () => {
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
        <SelectCity
          onChange={handleRegionChange}
          value={selectedRegion?.id}
          countryId={selectedCountry?.id}
        />
        <CarModel />
        <DatePicker />
        {/* <PicupDate palceholder="Pickup Date" />
        <ReturnDate palceholder="Return Date" /> */}
        <Button variant="gradient">Search for car</Button>
      </Flex>
    </Container>
  );
};
