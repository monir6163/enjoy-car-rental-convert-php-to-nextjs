import { Select } from "@mantine/core";

export default function ReturnLocation() {
  return (
    <Select
      className="w-full custom"
      placeholder="Return Location (Optional)"
      data={["United States", "Serbia", "Bangladesh"]}
      searchable
      clearable
      nothingFoundMessage="No city found"
    />
  );
}
