"use client";
import { Container } from "@mantine/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./map.module.css";

interface Props {
  height?: string;
}

const MapBox = ({ height }: Props) => {
  return (
    <Container className={styles.container} mb="1rem" size="100%">
      <MapContainer
        className={styles.mapContainer}
        center={[51.505, -0.09]}
        zoom={14}
        style={{ height: height || "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>City name</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};
export default MapBox;
