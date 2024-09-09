import { Select } from "@mantine/core";

export default function SelectCountry() {
  return (
    <Select
      className="w-full custom"
      placeholder="Select Country"
      data={["United States", "Serbia", "Bangladesh"]}
      defaultValue={"Bangladesh"}
      searchable
      clearable
      nothingFoundMessage="No country found"
    />
  );
}
