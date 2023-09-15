import { Attacking } from '../../abilities/attacking';
import { Movable } from '../../abilities/movable';
import { IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { EnemyType, mapEnemyTypeToCoords } from './enemy.const';
import { EnemyAbilities, EnemyConfig } from './enemy.types';

const ENEMY_SIZE = 192;

export default class Enemy extends Character<EnemyType, EnemyAbilities> implements IMovableCharacter {
  protected _sprite: string = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = EnemyType.WARRIOR_BLUE;
  protected _size = ENEMY_SIZE;

  constructor({ controller, height, width, initialX, initialY }: EnemyConfig) {
    super({
      abilities: {
        movable: new Movable({ height, width, initialX, initialY, stream$: controller.movement$ }),
        attacking: new Attacking({ stream$: controller.attack$ }),
      },
    });
  }

  protected _getCoordsMap() {
    return mapEnemyTypeToCoords;
  }
}
