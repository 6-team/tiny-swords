import { ITile } from '../../common/common.types';

export type TileXCoord = number;

export type TileYCoord = number;

export type CoordsTuple = [TileXCoord, TileYCoord];

export interface WithSetPersonageContext {
  setContext(context: ITile): void;
}

export interface WithAbility<Name extends string | symbol, Ability extends WithSetPersonageContext> {
  abilities: Map<Name, Ability>;
}
