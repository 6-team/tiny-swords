import { WithSetPersonageContext } from '../../abilities/abilities.types';
import { TPixelsPosition } from '../../common/common.types';

export type CoordsTuple = [TPixelsPosition, TPixelsPosition];

export interface WithAbility<Name extends string | symbol, Ability extends WithSetPersonageContext> {
  abilities: Map<Name, Ability>;
}
