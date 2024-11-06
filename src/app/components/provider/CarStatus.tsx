import { updateCarStatus } from "@/actions/carAction";
import { Loader, Menu, UnstyledButton } from "@mantine/core";
import {
  IconCalendarCheck,
  IconHourglassLow,
  IconProgressCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { CarStatus as CarStatusType } from "../../../../types";
import { StatusRenderer } from "../StatusRenderer";

const statuses: {
  display: string;
  value: CarStatusType;
  color: string;
  icon: ReactNode;
}[] = [
  {
    display: "Available",
    value: "available",
    color: "green",
    icon: <IconProgressCheck size={14} />,
  },
  {
    display: "Pending",
    value: "pending",
    color: "gray.6",
    icon: <IconHourglassLow size={14} />,
  },
  {
    display: "Booked",
    value: "booked",
    color: "red",
    icon: <IconCalendarCheck size={14} />,
  },
];

interface TableActionsProps {
  id: number;
  status: CarStatusType;
}

export function CarStatus({ status, id }: TableActionsProps) {
  const { refresh } = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (selectedStatus: CarStatusType) => {
    if (status !== selectedStatus) {
      setIsUpdating(true);
      // server action
      const statusValue = await updateCarStatus(id, selectedStatus);
      refresh();
      setIsUpdating(false);

      if (statusValue?.data) {
        refresh();
        toast.success("Status updated successfully");
      }

      if (statusValue?.error) {
        toast.error("Failed to update car status!. Try again later");
      }
    }
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {isUpdating ? (
          <Loader size="xs" />
        ) : (
          <UnstyledButton>
            <StatusRenderer variant="light" status={status} />
          </UnstyledButton>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Car Status</Menu.Label>

        {statuses.map((item) => (
          <Menu.Item
            key={item.value}
            onClick={() => handleUpdateStatus(item.value)}
            leftSection={item.icon}
            color={item.color}
          >
            {item.display}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
