import { WithSetPersonageContext } from '../../common/abilities/abilities.types';

export type TileXCoord = number;

export type TileYCoord = number;

export type CoordsTuple = [TileXCoord, TileYCoord];

export interface WithAbility<Name extends string | symbol, Ability extends WithSetPersonageContext> {
  abilities: Map<Name, Ability>;
}
