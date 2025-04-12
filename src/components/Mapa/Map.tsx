import "leaflet/dist/leaflet.css";
import IconMap from "./Icon";
import IconUserLocation from "./UserLocation";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Point } from "@/types/Point";
import { Tourism } from "@/types/Tourism";

type MapProps = {
  points: Point[];
  onPointSelect: (point: Point) => void;
  userLocation?: [number, number] | null;
  tourism?: Tourism[]
}

const DEFAULT_POSITION: [number, number] = [-27.11, -48.62];

const Map = ({
  points,
  onPointSelect,
  userLocation,
  tourism,
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

        {tourism?.map((tourism) => {
          const icon = IconMap({ pointType: tourism.type });

          return (
            <Marker
              key={tourism.id}
              position={[tourism.latitude, tourism.longitude]}
              icon={icon}
            />
          );
        })}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={IconUserLocation()} 
          />
        )}

      </MapContainer>
    </>
  );
};

export default Map;
