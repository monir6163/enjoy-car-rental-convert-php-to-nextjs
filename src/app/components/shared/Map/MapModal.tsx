import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
const MapBox = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapModal() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <MapBox />
      </Modal>

      <Button onClick={open}>Show Map</Button>
    </>
  );
}
