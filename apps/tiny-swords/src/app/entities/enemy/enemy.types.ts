import { CharacterDirection } from '@shared';

import { IMoving } from '@abilities/moving';
import { IFighting } from '@abilities/fighting';
import { TNumberOfPixels, TSpritePosition } from '@common/common.types';
import { EnemyType } from './enemy.const';

export type EnemyAbilities = {
  moving: IMoving;
  fighting: IFighting;
};

export interface EnemyConfig {
  height: TNumberOfPixels;
  width: TNumberOfPixels;
  initialX: TSpritePosition;
  initialY: TSpritePosition;
  initialDirection?: CharacterDirection;
  id: string;
  type?: EnemyType;
}
