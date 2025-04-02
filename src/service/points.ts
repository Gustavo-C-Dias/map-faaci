import { supabase } from "@/utils/supabase";
import { Point } from "@/types/Point";

export async function fetchPoints(): Promise<Point[]> {
  const { data, error } = await supabase
    .from("points")
    .select("id, name, route_id, type, location");

  if (error) {
    console.error("Erro ao buscar pontos:", error);
    return [];
  }

  return data.map((point) => ({
    ...point,
    latitude: point.location ? point.location.coordinates[1] : null,
    longitude: point.location ? point.location.coordinates[0] : null,
  }));
};
