import { WithSetPersonageContext } from '../abilities/abilities.types';

export type TNumberOfTiles = number;

export type TTilePosition = number;

export type TPixelsPosition = number;

export interface IGrid {
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
    row: number;
    col: number;
    scale: number;
  }>;
  setAnimation(row: number): void;
  initAnimation(deltaTime: number): void;
}

export interface ICharacter<Abilities extends Record<string | symbol | number, WithSetPersonageContext>> extends ITile {
  getAbility<Name extends keyof Abilities>(name: Name): Abilities[Name];
}
