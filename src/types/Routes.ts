export interface Route {
  id: number;
  route_name: string;
  difficulty: string;
  distance: number;
  photos: string[];
  altitude_max: number;
  altitude_min: number;
  elevation_total: number;
  loss_total: number;
  description: string;
  time: string;
}