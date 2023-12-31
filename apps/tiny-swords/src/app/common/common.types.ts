import { WithSetPersonageContext } from '../abilities/abilities.types';
import { ResourcesType } from '../entities/resource';

export type TNumberOfSprites = number;

export type TSpritePosition = number;

export type TNumberOfPixels = number;

export type TPixelsPosition = number;

export type TTiledCoords = [x: TSpritePosition, y: TSpritePosition, height: TNumberOfSprites, width: TNumberOfSprites];

export interface IGrid {
  spriteSize: number;
  transformToPixels(
    x: number,
    y: number,
    height: number,
    width: number,
  ): [pxX: number, pxY: number, pxHeight: number, pxWidth: number];
}

export interface ISprite {
  getData(): Promise<{
    image: HTMLImageElement;
    coords: [number, number];
    size: number;
    scale: number;
  }>;
  setAnimation(row: number): void;
  setAnimationOnce(row: number): Promise<void>;
  switchAnimationFrame(deltaTime: number): void;
}

export interface ICharacter<Abilities extends Record<string | symbol | number, WithSetPersonageContext>>
  extends ISprite {
  getAbility<Name extends keyof Abilities>(name: Name): Abilities[Name];
}

export interface PowerUp {}

export interface IResource {
  powerUps: Array<PowerUp>;
  getQuantity: () => number;
  resourceImage: string;
}

export enum ImprovementTypes {
  LIFE,
  LIFE_SLOT,
  SHIELD,
  ARCHER_BOW,
  ARCHER,
  TNT,
}

export type ImprovementItemType = {
  name: string;
  type: ImprovementTypes;
  icon: string;
  cost: { type: ResourcesType; price: number };
  styles?: { icon?: string; icon_wrapper?: string };
  available: boolean;
};

export type buyImprovementsType = (resource: { type: ResourcesType; price: number }, type: ImprovementTypes) => void;

export type availableResourcesCheckType = (
  resource: { type: ResourcesType; price: number },
  improvementType: ImprovementTypes,
) => boolean;
