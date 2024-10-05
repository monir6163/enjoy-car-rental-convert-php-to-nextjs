import { Select } from "@mantine/core";
interface Props {
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
}
export default function CarModel({ value, label, onChange }: Props) {
  const carModels = [
    { value: "one", label: "Model 1" },
    { value: "two", label: "Model 2" },
    { value: "three", label: "Model 3" },
  ];
  return (
    <Select
      className="custom"
      placeholder="Select Car Model"
      data={
        carModels
          ? carModels?.map((carModel) => ({
              value: carModel.value,
              label: carModel.label,
            }))
          : []
      }
      value={value}
      onChange={(value) => onChange && onChange(value || "")}
      searchable
      nothingFoundMessage="No car model found"
    />
  );
}
