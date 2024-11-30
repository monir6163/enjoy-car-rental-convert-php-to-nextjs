import { ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import React, { ReactNode, useRef } from "react";
interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SelectTime({ value, onChange, label }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );
  return (
    <TimeInput
      width="100%"
      className="custom"
      label={label || ""}
      ref={ref}
      rightSection={pickerControl}
      value={value}
      onChange={(event) => onChange?.(event)}
    />
  );
}
