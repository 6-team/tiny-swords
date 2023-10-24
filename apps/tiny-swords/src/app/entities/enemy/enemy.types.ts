import { CharacterDirection } from '@shared';
import { TNumberOfPixels, TTilePosition } from '../../common/common.types';
import { IMoving } from '../../abilities/moving/moving.types';
import { IFighting } from '../../abilities/fighting/fighting.types';

export type EnemyAbilities = {
  moving: IMoving;
  fighting: IFighting;
};

export interface EnemyConfig {
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TTilePosition;
  initialY: TTilePosition;
  initialDirection?: CharacterDirection;
  id: string | number;
}
