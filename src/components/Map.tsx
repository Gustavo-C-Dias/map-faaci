import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Point } from "@/types/Point";
import { Route } from "@/types/Routes";

type MapProps = {
  points: Point[];
  onPointSelect: (point: Point) => void;
  userLocation?: [number, number] | null;
  route?: Route | null;
}

const DEFAULT_POSITION: [number, number] = [-27.11, -48.62];

const Map = ({
  points,
  onPointSelect,
  userLocation,
  route,
}: MapProps) => {

  const startIcon = L.icon({
    iconUrl: "trilha.webp",
    iconSize: [32, 32],
  });

  const endIcon = L.icon({
    iconUrl: "trilha.webp",
    iconSize: [32, 32],
  });

  return (
    <>
      <MapContainer
        center={userLocation || DEFAULT_POSITION}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points?.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={point.type === 1 ? startIcon : endIcon}
            eventHandlers={{
              click: () => onPointSelect(point)
            }}
          />
        ))}

        {route && route.path && (
          <Polyline positions={route.path.coordinates} color="blue" />
        )}

        {userLocation && (
          <Marker position={userLocation} />
        )}

      </MapContainer>
    </>
  );
};

export default Map;
