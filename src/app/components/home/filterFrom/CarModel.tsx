import { Select } from "@mantine/core";

export default function CarModel() {
  return (
    <Select
      className="custom"
      placeholder="Select Car Model"
      data={[
        { value: "usa", label: "Toyota" },
        { value: "serbia", label: "Honda" },
        { value: "bd", label: "BMW" },
      ]}
      searchable
      clearable
      nothingFoundMessage="No car model found"
    />
  );
}
