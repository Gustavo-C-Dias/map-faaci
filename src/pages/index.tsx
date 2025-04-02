import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchPoints } from "@/service/points";
import Search from "@/components/Search";
import { Point } from "@/types/Point";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [searchPoints, setSearchPoints] = useState<Point[]>([]);


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
      setSearchPoints(fetchedPoints);
    };

    loadPoints();
  }, []);

  return (
    <>
      <Search points={points} onKeyWords={setSearchPoints} />
      <Map points={searchPoints} userLocation={userLocation ? userLocation : undefined} />
    </>
  );
}

