export type TNumberOfTiles = number;

export type TTilePosition = number;

export interface IWithCoordsMethods {
  sizes: [height: number, width: number];
  coords: [x: TTilePosition, y: TTilePosition];
  setCoords: (updater: (prev: [TTilePosition, TTilePosition]) => [TTilePosition, TTilePosition]) => void;
  back(): void;
}
