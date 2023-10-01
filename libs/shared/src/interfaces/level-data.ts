export interface LevelData<M = unknown> {
  gridX: number;
  gridY: number;
  startCoords: [number, number];
  endCoords: [number, number];
  maps: M[];
  boundaries: [number, number][];
}
