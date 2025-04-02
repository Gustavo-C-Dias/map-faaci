import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchRoute } from "@/service/routes";
import { Point } from "@/types/Point";
import { Route } from "@/types/Routes";

const DEFAULT_POSITION: [number, number] = [-27.11, -48.62];

const Map = ({ points, userLocation }: { points: Point[]; userLocation?: [number, number] }) => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [route, setRoute] = useState<Route | null>(null);

  const startIcon = L.icon({
    iconUrl: "trilha.webp",
    iconSize: [32, 32],
  });

  const endIcon = L.icon({
    iconUrl: "trilha.webp",
    iconSize: [32, 32],
  });

  useEffect(() => {
    if (selectedPoint?.route_id) {
      fetchRoute(selectedPoint.route_id).then((route) => {
        setRoute(route);
      });
    }
  }, [selectedPoint]);

  return (
    <>
      <MapContainer
        center={userLocation || DEFAULT_POSITION}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points?.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={point.type === 1 ? startIcon : endIcon}
            eventHandlers={{
              click: () => setSelectedPoint(point)
            }}
          />
        ))}

        {route && route.path && (
          <>
            {console.log(route.path)}
            <Polyline positions={route.path.coordinates} color="blue" />
          </>
        )}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
