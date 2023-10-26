import { EnemySound } from './../../core/sounds/enemy-sounds';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { EnemyType, mapEnemyTypeToCoords } from './enemy.const';
import { EnemyAbilities, EnemyConfig } from './enemy.types';
import { isMuttedStore } from '../../store';
import { IEnemySounds } from '../../core/sounds/enemy-sounds.types';
import { IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFighting, IFightingCharacter } from '../../abilities/fighting/fighting.types';
import { Fighting } from '../../abilities/fighting';
import { Moving } from '../../abilities/moving';

const ENEMY_SIZE = 192;

export default class Enemy
  extends Character<EnemyType, EnemyAbilities>
  implements IMovingCharacter, IFightingCharacter
{
  protected _sprite = './img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png';
  protected _type = EnemyType.TORCH_RED;
  protected _size = ENEMY_SIZE;

  sounds: IEnemySounds;

  constructor({ height, width, initialX, initialY, initialDirection, id }: EnemyConfig) {
    super({ id });

    const fighting = new Fighting({ availibleLives: 1, blockedLives: 0 });
    const moving = new Moving({
      height,
      width,
      initialX,
      initialY,
      getCollisionArea: (moving) => {
        const [x1, y1] = moving.coords;

        return [x1 + grid64.tileSize, y1 + grid64.tileSize, grid64.tileSize, grid64.tileSize];
      },
    });

    this._setAbilities({ moving, fighting });
    this._initSounds({ fighting });

    moving.setCharacterDirection(initialDirection);
  }

  /**
   * @TODO Описать эти типы в интерфейсах
   */
  get moving() {
    return this.getAbility('moving');
  }

  get fighting() {
    return this.getAbility('fighting');
  }

  private _initSounds({ fighting }: { fighting: IFighting }): void {
    this.sounds = new EnemySound({ fighting });

    isMuttedStore.subscribe((value) => {
      if (value) {
        this.sounds.muteSound();
      } else {
        this.sounds.unmuteSound();
      }
    });
  }

  protected _getCoordsMap() {
    return mapEnemyTypeToCoords;
  }
}
