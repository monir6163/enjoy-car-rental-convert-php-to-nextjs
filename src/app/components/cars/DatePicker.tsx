import { Flex } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  placeholder?: string;
  value?: DateValue | Date;
  onChange?: (value: DateValue) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker() {
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="center"
      gap={{ base: "sm", sm: "lg" }}
      align={{
        base: "stretch",
        sm: "flex-end",
      }}
      className="custom"
    >
      <PickupDate
        value={pickupDate}
        onChange={(date) => {
          setPickupDate(date);
          if (
            returnDate &&
            dayjs(returnDate).isBefore(dayjs(date).add(1, "day"))
          ) {
            setReturnDate(null);
          }
        }}
        placeholder="Select pickup date"
        minDate={new Date()}
      />

      <ReturnDate
        value={returnDate}
        onChange={setReturnDate}
        placeholder="Select return date"
        minDate={
          pickupDate ? dayjs(pickupDate).add(1, "day").toDate() : new Date()
        }
        maxDate={dayjs(new Date()).add(1, "month").toDate()}
      />
    </Flex>
  );
}

function PickupDate({ value, onChange, placeholder, minDate }: Props) {
  return (
    <DateInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minDate={minDate || new Date()}
      maxDate={dayjs(new Date()).add(1, "month").toDate()}
      width="100%"
    />
  );
}

function ReturnDate({ value, onChange, placeholder, minDate, maxDate }: Props) {
  return (
    <DateInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minDate={minDate || dayjs(new Date()).add(1, "day").toDate()}
      maxDate={maxDate || dayjs(new Date()).add(1, "month").toDate()}
      width="100%"
    />
  );
}
