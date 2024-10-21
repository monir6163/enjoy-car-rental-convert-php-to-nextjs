import { ghCurrencySymbol } from "@/const";
import { Box, Flex, NumberInput, RangeSlider, Text } from "@mantine/core";

const lowestPrice = 0;
const highestPrice = 5000;

export const PriceRange = () => {
  const labelFormatter = (value: number) => {
    return `${ghCurrencySymbol} ${value}`;
  };

  return (
    <>
      <Text my={16}>Price Range</Text>
      <RangeSlider
        py="xl"
        step={10}
        min={lowestPrice}
        max={highestPrice}
        labelAlwaysOn
        label={labelFormatter}
        thumbSize={12}
        color="pink"
      />
      <Flex gap={8}>
        <Box>
          <Text size="xs">Min.</Text>
          <NumberInput step={10} min={lowestPrice} max={highestPrice} />
        </Box>
        <Box>
          <Text size="xs">Max.</Text>
          <NumberInput step={10} min={10} max={highestPrice} />
        </Box>
      </Flex>
    </>
  );
};
