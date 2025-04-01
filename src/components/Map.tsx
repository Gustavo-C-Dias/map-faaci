import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Point } from "@/types/Point";

const DEFAULT_POSITION: [number, number] = [-27.11, -48.62];

const Map = ({ points, userLocation }: { points: Point[]; userLocation?: [number, number] }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  function CustomZoomControl() {
    const map = useMap();

    useEffect(() => {
      const zoomControl = L.control.zoom({ position: "bottomright" });
      zoomControl.addTo(map);

      return () => {
        map.removeControl(zoomControl);
      };
    }, [map]);

    return null;
  }

  const customIcon = L.icon({
    iconUrl: "trilha.webp",
    iconSize: [32, 32],
  });

  // const route = selectedPoint
  // ? points.filter((p) => p.start_id === selectedPoint.id || p.end_id === selectedPoint.id)
  // : [];

  return (
    <>
      <MapContainer center={userLocation || DEFAULT_POSITION} zoom={14} style={{ height: "100vh", width: "100%" }} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points?.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={customIcon}
          />
        ))}
{/* 
        {route.length > 1 && (
          <Polyline positions={route.map((p) => [p.latitude, p.longitude])} color="blue" />
        )} */}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}

        <CustomZoomControl />
      </MapContainer>
    </>
  );
};

export default Map;
