export interface Route {
  id: number;
  route_name: string;
  path: {
    coordinates: [number, number][];
  }
  difficulty: string;
  distance: number;
}