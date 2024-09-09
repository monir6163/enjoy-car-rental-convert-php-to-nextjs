import { DateInput, DateValue } from "@mantine/dates";
interface props {
  palceholder?: string;
  value?: DateValue | Date;
  onChange?: (value: DateValue) => void;
  minDate?: Date;
  maxDate?: Date;
}
export default function PicupDate({
  value,
  onChange,
  palceholder,
  minDate,
}: props) {
  return (
    <div>
      <DateInput
        value={value}
        onChange={onChange}
        placeholder={palceholder}
        minDate={minDate}
        width="100%"
      />
    </div>
  );
}
