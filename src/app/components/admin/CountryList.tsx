"use client";
import { deleteCountry, updateCountryStatus } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";

export default function CountryList({ countries }: any) {
  const { refresh } = useRouter();

  const handleCountryStatus = async (id: string, status: string) => {
    const res = await updateCountryStatus(id, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Country status updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCountry(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Country deleted successfully");
    }
  };

  const rows = countries?.map((p: any, i: number) => (
    <Table.Tr key={p.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>{p.code}</Table.Td>
      <Table.Td>{formatDate(p.createdAt)}</Table.Td>
      <Table.Td className="flex gap-1">
        {p.status === "active" ? (
          <ActionIcon
            color="green"
            onClick={() => handleCountryStatus(p.id, "inactive")}
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleCountryStatus(p.id, "active")}
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={p.name}
          onConfirm={() => handleDelete(p.id)}
          openButton={
            <ActionIcon color="red">
              <IconTrash size="1.2rem" />
            </ActionIcon>
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1 className="text-center font-semibold text-xl py-2">
        All Country List - ( {countries.length} )
      </h1>

      <Table.ScrollContainer minWidth={500} type="native">
        <Table
          striped
          stickyHeader
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>S.N</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Code</Table.Th>
              <Table.Th>CreatedAt</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
