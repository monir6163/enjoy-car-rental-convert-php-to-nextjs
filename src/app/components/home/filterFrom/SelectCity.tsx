import { Select } from "@mantine/core";

export default function SelectCity() {
  return (
    <Select
      className="custom"
      placeholder="Select Pickup City"
      data={["United States", "Serbia", "Bangladesh"]}
      searchable
      clearable
      nothingFoundMessage="No city found"
    />
  );
}
