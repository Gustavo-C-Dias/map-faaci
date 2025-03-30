import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Point } from "@/types/Point";

const DEFAULT_POSITION: [number, number] = [-27.11, -48.62];

const Map = ({ points, userLocation }: { points: Point[]; userLocation?: [number, number] }) => {

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
    iconUrl: "trilha.webp", // URL do ícone personalizado
    iconSize: [32, 32],
  });

  return (
    <>
      <MapContainer center={userLocation || DEFAULT_POSITION} zoom={14} style={{ height: "100vh", width: "100%" }} zoomControl={false}>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />

        {points?.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={customIcon}
          />
        ))}

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
