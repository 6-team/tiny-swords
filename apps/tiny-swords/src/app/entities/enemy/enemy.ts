import { Attacking } from '../../abilities/attacking';
import { Movable } from '../../abilities/movable';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { EnemyType, mapEnemyTypeToCoords } from './enemy.const';
import { EnemyAbilities, EnemyConfig } from './enemy.types';

const ENEMY_SIZE = 192;

export default class Enemy
  extends Character<EnemyType, EnemyAbilities>
  implements IMovableCharacter, IAttackingCharacter
{
  protected _sprite: string = '/img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png';
  protected _type = EnemyType.TORCH_RED;
  protected _size = ENEMY_SIZE;

  constructor({ controllerCreator, height, width, initialX, initialY, id }: EnemyConfig) {
    super({ id });

    const attacking = new Attacking();
    const movable = new Movable({
      height,
      width,
      initialX,
      initialY,
      getCollisionArea: (movable) => {
        const [x1, y1] = movable.coords;

        return [x1 + grid64.tileSize, y1 + grid64.tileSize, grid64.tileSize, grid64.tileSize];
      },
    });

    this._setAbilities({
      movable,
      attacking,
    });

    const controller = controllerCreator(this);

    movable.setController(controller);
    attacking.setController(controller);
  }

  protected _getCoordsMap() {
    return mapEnemyTypeToCoords;
  }
}
