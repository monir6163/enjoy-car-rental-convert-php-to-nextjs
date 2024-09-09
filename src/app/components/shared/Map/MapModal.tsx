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
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        size={"70%"}
      >
        <MapBox />
      </Modal>

      <Button onClick={open}>Show Map</Button>
    </>
  );
}
