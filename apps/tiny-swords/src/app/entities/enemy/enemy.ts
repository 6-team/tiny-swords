import { IAttacking } from './../../abilities/abilities.types';
import { EnemySound } from './../../core/sounds/enemy-sounds';
import { Attacking } from '../../abilities/attacking';
import { Movable } from '../../abilities/movable';
import { IAttackingCharacter, IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { EnemyType, mapEnemyTypeToCoords } from './enemy.const';
import { EnemyAbilities, EnemyConfig } from './enemy.types';
import { isMuttedStore } from '../../store';
import { IEnemySounds } from '../../core/sounds/enemy-sounds/enemy-sounds.types';

const ENEMY_SIZE = 192;

export default class Enemy
  extends Character<EnemyType, EnemyAbilities>
  implements IMovableCharacter, IAttackingCharacter
{
  protected _sprite = './img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png';
  protected _type = EnemyType.TORCH_RED;
  protected _size = ENEMY_SIZE;
  sounds: IEnemySounds;

  constructor({ controllerCreator, height, width, initialX, initialY, initialDirection, id }: EnemyConfig) {
    super({ id });

    const attacking = new Attacking({ availibleLives: 1, blockedLives: 0 });
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

    this._setAbilities({ movable, attacking });

    const controller = controllerCreator(this);

    movable.setController(controller);
    movable.setStandingDirection(initialDirection);
    attacking.setController(controller);

    /**
     * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
     */
    if (controller.setCharacter) {
      controller.setCharacter(this);
    }

    /**
     * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
     */
    if (controller.init) {
      controller.init();
    }

    this.#initSounds(attacking);
  }

  /**
   * @TODO Описать эти типы в интерфейсах
   */
  get moving() {
    return this.getAbility('movable');
  }

  get fighting() {
    return this.getAbility('attacking');
  }

  #initSounds(attacking: IAttacking): void {
    this.sounds = new EnemySound({ attacking });

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
