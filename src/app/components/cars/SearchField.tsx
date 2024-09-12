import { Button, Container, Flex } from "@mantine/core";

import CarModel from "../home/filterFrom/CarModel";
import SelectCity from "../home/filterFrom/SelectCity";
import SelectCountry from "../home/filterFrom/SelectCountry";
import DatePicker from "./DatePicker";
import styles from "./search.module.css";

export const SearchEngine = () => {
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
        <SelectCountry />
        <SelectCity />
        <CarModel />
        <DatePicker />
        {/* <PicupDate palceholder="Pickup Date" />
        <ReturnDate palceholder="Return Date" /> */}
        <Button variant="gradient">Search for car</Button>
      </Flex>
    </Container>
  );
};
