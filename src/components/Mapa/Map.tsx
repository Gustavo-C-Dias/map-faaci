import "leaflet/dist/leaflet.css";
import IconMap from "./Icon";
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

  return (
    <>
      <MapContainer
        center={userLocation || DEFAULT_POSITION}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points?.map((point) => {
          const icon = IconMap({ pointType: point.type });

          return (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onPointSelect(point)
              }}
            />
          );
        })}

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
