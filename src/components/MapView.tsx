import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import FlyToLocation from "./FlyToLocation";

import ClickOnMap from "./ClickOnMap";
import { useAppSelector } from "../hooks/reduxHooks";

const MapView = () => {

const entries = useAppSelector(
  (state) => state.journal.entries
);

const selectedEntry = useAppSelector(
  (state) => state.selectedEntry
);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
    >
      <FlyToLocation
      lat={selectedEntry.lat}
      lng={selectedEntry.lng}
    />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickOnMap />

      {entries.map((entry) => (
        <Marker
          key={entry.id}
          position={[entry.lat, entry.lng]}
        >
          <Popup>
            <div>
              <h2>{entry.city}</h2>

              <p>{entry.note}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;