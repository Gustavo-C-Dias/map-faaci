import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../utils/supabase";
import "../styles/global.css";
import Search from "@/components/Search";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [points, setPoints] = useState<any[]>([]);
  const [searchPoints, setSearchPoints] = useState<any[]>([]);


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
        .from('Point') 
        .select();

      if (error) {
        console.error('Erro ao buscar pontos:', error);
      } else {
        setPoints(data);
        setSearchPoints(data);
      }
    };

    fetchPoints(); // Chama a função de buscar os pontos quando a página carregar
  }, []);

  return (
    <>
      <Search points={points} onKeyWords={setSearchPoints} />
      <Map points={searchPoints} userLocation={userLocation ? userLocation : undefined} />
    </>
  );
}

