import { IAttacking, IMovable } from '../../abilities';
import { ICollecting } from '../../abilities/abilities.types';

export type SoundType = {
  [key: string]: HTMLAudioElement;
};

export interface SoundsProps {
  movable: IMovable;
  attacking: IAttacking;
  collecting: ICollecting;
}
