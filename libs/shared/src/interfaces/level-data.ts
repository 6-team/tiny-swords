export interface LevelData<M = unknown, R = unknown> {
  gridX: number;
  gridY: number;
  startCoords: [number, number];
  endCoords: [number, number];
  maps: M[];
  boundaries: [number, number][];
  resources: R[];
}
