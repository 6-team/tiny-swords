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
import { IEnemySounds } from '../../core/sounds/enemy-sounds.types';

const ENEMY_SIZE = 192;

export default class Enemy
  extends Character<EnemyType, EnemyAbilities>
  implements IMovableCharacter, IAttackingCharacter
{
  protected _sprite = './img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png';
  protected _type = EnemyType.TORCH_RED;
  protected _size = ENEMY_SIZE;
  enemySounds: IEnemySounds;

  constructor({ controllerCreator, height, width, initialX, initialY, initialAnimation, id }: EnemyConfig) {
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

    this._setAbilities({ movable, attacking });

    const controller = controllerCreator(this);

    movable.setController(controller);
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

    if (initialAnimation) {
      this.setAnimation(initialAnimation);
    }

    this.#initSounds(attacking);
  }

  #initSounds(attacking: IAttacking): void {
    this.enemySounds = new EnemySound({ attacking });

    isMuttedStore.subscribe((value) => {
      if (value) {
        this.enemySounds.muteSound();
      } else {
        this.enemySounds.unmuteSound();
      }
    });
  }

  protected _getCoordsMap() {
    return mapEnemyTypeToCoords;
  }
}
