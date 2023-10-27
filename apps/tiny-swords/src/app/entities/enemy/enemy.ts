import { EnemySound, IEnemySounds } from '@core/sounds/enemy-sounds';
import { grid64 } from '@core/grid';
import { Character } from '@entities/character';
import { EnemyType, mapEnemyTypeToCoords } from './enemy.const';
import { EnemyAbilities, EnemyConfig } from './enemy.types';
import { isMuttedStore } from '@store';
import { Fighting, IFighting, IFightingCharacter } from '@abilities/fighting';
import { Moving, IMovingCharacter } from '@abilities/moving';

const ENEMY_SIZE = 192;

/**
 * Represents an Enemy character.
 */
export default class Enemy
  extends Character<EnemyType, EnemyAbilities>
  implements IMovingCharacter, IFightingCharacter
{
  /**
   * The sprite URL for the enemy.
   * @type {string}
   * @private
   */
  protected _sprite = './img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png';

  /**
   * The type of the enemy.
   * @type {EnemyType}
   * @private
   */
  protected _type = EnemyType.TORCH_RED;

  /**
   * The size of the enemy.
   * @type {number}
   * @private
   */
  protected _size = ENEMY_SIZE;

  /**
   * The sounds of the enemy.
   * @type {IEnemySounds}
   * @private
   */
  protected _sounds: IEnemySounds;

  /**
   * Creates an instance of the Enemy character.
   * @param {EnemyConfig} config - The configuration object for the Enemy.
   */
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
   * Gets the moving ability of the Enemy.
   * @returns {IMoving} The moving ability.
   */
  get moving() {
    return this.getAbility('moving');
  }

  /**
   * Gets the fighting ability of the Enemy.
   * @returns {IFighting} The fighting ability.
   */
  get fighting() {
    return this.getAbility('fighting');
  }

  /**
   * Initializes the sounds for the Enemy.
   * @param {Object} abilities - The abilities of the Enemy.
   * @param {IFighting} abilities.fighting - The fighting ability.
   * @private
   */
  private _initSounds({ fighting }: { fighting: IFighting }): void {
    this._sounds = new EnemySound({ fighting });

    isMuttedStore.subscribe((value) => {
      if (value) {
        this._sounds.muteSound();
      } else {
        this._sounds.unmuteSound();
      }
    });
  }

  /**
   * Gets the coordinates map for enemy.
   * @private
   * @returns {Record<EnemyType, CoordsTuple>} - The map of enemy coordinates.
   */
  protected _getCoordsMap() {
    return mapEnemyTypeToCoords;
  }
}
