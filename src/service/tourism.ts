import { supabase } from "@/utils/supabase";
import { Tourism } from "@/types/Tourism";

export async function fetchTourism(idPath: number): Promise<Tourism[]> {
  const { data, error } = await supabase
    .from("tourism")
    .select("id, name, route_id, type, location, photos, description")
    .eq("route_id", idPath);

  if (error) {
    console.error("Erro ao buscar pontos:", error);
    return [];
  }

  return data.map((tourism) => ({
    ...tourism,
    latitude: tourism.location ? tourism.location.coordinates[1] : null,
    longitude: tourism.location ? tourism.location.coordinates[0] : null,
  }));
};
