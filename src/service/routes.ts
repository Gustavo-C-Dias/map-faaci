import { supabase } from "@/utils/supabase";
import { Route } from "@/types/Routes";

export async function fetchRoute(idPath: number): Promise<Route | null> {
  const { data, error } = await supabase
    .from("routes")
    .select("id, route_name, path, difficulty, distance, photos, altitude_max, altitude_min, elevation_total, loss_total, description")
    .eq("id", idPath)
    .single();

  if (error) {
    console.error("Erro ao buscar rota:", error);
    return null;
  }

  return data;
}
