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

      try {
        // Using Nominatim with CORS proxy for better compatibility
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "User-Agent": "WorldJournal-App (https://github.com/mahigya122/WorldWise)"
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        const address = data.address || {};
        
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.hamlet ||
          address.county ||
          "unknown";

        const country = address.country || "unknown";

        dispatch(
          setCity({
            city,
            country,
            lat,
            lng,
          })
        );

        navigate(`/dashboard/form?lat=${lat}&lng=${lng}`);
      } catch (error) {
        console.error("Geocoding error:", error);
        // Fallback: dispatch with unknown values but still navigate
        dispatch(
          setCity({
            city: "unknown",
            country: "unknown",
            lat,
            lng,
          })
        );
        navigate(`/dashboard/form?lat=${lat}&lng=${lng}`);
      }
    },
  });

  return null;
};

export default ClickOnMap;