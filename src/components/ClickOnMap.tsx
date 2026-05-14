import { useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setCity } from "../redux/citySlice";

const ClickOnMap = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useMapEvents({
    click: async (e: LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      const data = await response.json();
      const address = data;

      const city =
        address.city ||
        address.town ||
        address.village ||
        "unknown";

      const country = address.countryName || "unknown";

      dispatch(
        setCity({
          city,
          country,
          lat,
          lng,
        })
      );

      navigate(`/dashboard/form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
};

export default ClickOnMap;