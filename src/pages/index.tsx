import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Details from "@/components/Details/Details";
import Search from "@/components/Filters/Search";

import { fetchPoints } from "@/service/points";
import { fetchRoute } from "@/service/routes";

import { Point } from "@/types/Point";
import { Route } from "@/types/Routes";

const Map = dynamic(() => import("../components/Mapa/Map"), { ssr: false });

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        }
      );
    }

    const loadPoints = async () => {
      const fetchedPoints = await fetchPoints();
      setPoints(fetchedPoints);
    };

    loadPoints();
  }, []);

  useEffect(() => {
    if (selectedPoint?.route_id) {
      fetchRoute(selectedPoint.route_id).then((route) => {
        setRoute(route);
      });
    }
  }, [selectedPoint]);

  const filteredPoints = points.filter(point => 
    point.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Search
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <main>
        <Map
          points={filteredPoints}
          userLocation={userLocation}
          onPointSelect={setSelectedPoint}
          route={route}
        />

        <Details route={route} />
      </main>
    </>
  );
}

