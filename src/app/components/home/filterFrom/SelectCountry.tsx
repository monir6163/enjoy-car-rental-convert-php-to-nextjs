import { Select } from "@mantine/core";

export default function SelectCountry() {
  return (
    <Select
      className="custom"
      placeholder="Select Country"
      data={["United States", "Serbia", "Bangladesh"]}
      defaultValue={"Bangladesh"}
      searchable
      clearable
      nothingFoundMessage="No country found"
    />
  );
}
