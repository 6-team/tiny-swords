import { IWithCoordsMethods } from '../entites/coordinate-system/coordinate-system.types';

export type TTilePosition = number;

export interface ICoordinateSystem {
  tileSize: number;
  transformToPixels(
    x: number,
    y: number,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number];
}

export interface ITile {
  getData(): Promise<{
    image: HTMLImageElement;
    coords: [number, number];
    size: number;
  }>;
}
