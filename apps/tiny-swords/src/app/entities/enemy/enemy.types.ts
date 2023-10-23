import { CharacterDirection } from '@shared';
import { IAttacking, IMovable } from '../../abilities';
import { TNumberOfPixels, TTilePosition } from '../../common/common.types';

export type EnemyAbilities = {
  movable: IMovable;
  attacking: IAttacking;
};

export interface EnemyConfig {
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TTilePosition;
  initialY: TTilePosition;
  initialDirection?: CharacterDirection;
  id: string | number;
}
