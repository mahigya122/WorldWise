import { useEffect } from "react";

import { useMap } from "react-leaflet";

type Props = {
  lat: number;
  lng: number;
};

const FlyToLocation = ({
  lat,
  lng,
}: Props) => {

  const map = useMap();

  useEffect(() => {

    map.flyTo([lat, lng], 8);

  }, [lat, lng, map]);

  return null;
};

export default FlyToLocation;