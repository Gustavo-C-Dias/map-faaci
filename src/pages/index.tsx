import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../utils/supabase";
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

    const fetchPoints = async () => {
      const { data, error } = await supabase
      .from('points')
      .select('id, name, route_id, type, location');

      if (error) {
        console.error('Erro ao buscar pontos:', error);
      } else {
        const formattedPoints = data.map((point) => ({
          ...point,
          latitude: point.location ? point.location.coordinates[1] : null,
          longitude: point.location ? point.location.coordinates[0] : null, 
        }));
      
        setPoints(formattedPoints);
        setSearchPoints(formattedPoints);
      }
    };

    fetchPoints();
  }, []);

  return (
    <>
      <Search points={points} onKeyWords={setSearchPoints} />
      <Map points={searchPoints} userLocation={userLocation ? userLocation : undefined} />
    </>
  );
}

