import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import ClickOnMap from "./ClickOnMap";

const MapView = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickOnMap />
    </MapContainer>
  );
};

export default MapView;