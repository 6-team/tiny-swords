import { WithSetPersonageContext } from './abilities/abilities.types';

export type TNumberOfTiles = number;

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
  getAbility<Name extends string | symbol, Ability extends WithSetPersonageContext>(name: Name): Ability;
  getData(): Promise<{
    image: HTMLImageElement;
    coords: [number, number];
    size: number;
  }>;
}
