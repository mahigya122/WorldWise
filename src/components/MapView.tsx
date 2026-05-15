import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

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
      center={[28.3949, 84.124]}
      zoom={7}
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
            <div className="text-black">
              <h2 className="font-bold">{entry.city}</h2>
              <Link
                to={`/dashboard/journals/${entry.id}`}
                className="text-blue-600 underline text-xs"
              >
                View Journal
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;