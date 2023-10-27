import { Collecting, ICollecting, ICollectingCharacter } from '@abilities/collecting';
import { grid64 } from '@core/grid';
import { Character } from '@entities/character';
import { HeroType, mapHeroImages, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';
import { isMuttedStore } from '@store';
import { HeroSounds, IHeroSounds } from '@core/sounds';
import { Fighting, IFighting, IFightingCharacter } from '@abilities/fighting';
import { Moving, IMoving, IMovingCharacter } from '@abilities/moving';

const HERO_SIZE = 192;

/**
 * Represents a Hero character.
 */
export default class Hero
  extends Character<HeroType, HeroAbilities>
  implements IMovingCharacter, IFightingCharacter, ICollectingCharacter
{
  /**
   * The sprite URL for the hero.
   * @type {string}
   * @private
   */
  protected _sprite: string;

  /**
   * The type of the Hero.
   * @type {HeroType}
   * @private
   */
  protected _type: HeroType;

  /**
   * The size of the Hero.
   * @type {number}
   * @private
   */
  protected _size = HERO_SIZE;

  /**
   * The sounds of the Hero.
   * @type {IHeroSounds}
   * @private
   */
  protected _sounds: IHeroSounds;

  /**
   * Creates an instance of the Hero character.
   * @param {HeroConfig} config - The configuration object for the Hero.
   */
  constructor({ height, width, initialX, initialY, id, type = HeroType.WARRIOR_BLUE }: HeroConfig) {
    super({ id });

    this._type = type;
    this._sprite = mapHeroImages[type];

    const fighting = new Fighting({ availibleLives: 1, blockedLives: 2 });
    const collecting = new Collecting();
    const moving = new Moving({
      height,
      width,
      initialX,
      initialY,
      getCollisionArea: (moving) => {
        const [x1, y1] = moving.coords;

        return [x1 + grid64.spriteSize, y1 + grid64.spriteSize, grid64.spriteSize, grid64.spriteSize];
      },
    });

    this._setAbilities({ moving, fighting, collecting });
    this._initSounds({ moving, fighting, collecting });
  }

  /**
   * Gets the moving ability of the Hero.
   * @returns {IMoving} The moving ability.
   */
  get moving() {
    return this.getAbility('moving');
  }

  /**
   * Gets the fighting ability of the Hero.
   * @returns {IFighting} The fighting ability.
   */
  get fighting() {
    return this.getAbility('fighting');
  }

  /**
   * Gets the collecting ability of the Hero.
   * @returns {ICollecting} The collecting ability.
   */
  get collecting() {
    return this.getAbility('collecting');
  }

  /**
   * Initializes the sounds for the Hero.
   * @param {Object} abilities - The abilities of the Hero.
   * @param {IMoving} abilities.moving - The moving ability.
   * @param {IFighting} abilities.fighting - The fighting ability.
   * @param {ICollecting} abilities.collecting - The collecting ability.
   * @returns {void}
   * @private
   */
  private _initSounds({
    moving,
    fighting,
    collecting,
  }: {
    moving: IMoving;
    fighting: IFighting;
    collecting: ICollecting;
  }): void {
    this._sounds = new HeroSounds({ moving, fighting, collecting });

    isMuttedStore.subscribe((value) => {
      if (value) {
        this._sounds.muteSound();
      } else {
        this._sounds.unmuteSound();
      }
    });
  }

  /**
   * Gets the coordinates map for hero.
   * @private
   * @returns {Record<HeroType, CoordsTuple>} - The map of hero coordinates.
   */
  protected _getCoordsMap() {
    return mapHeroTypeToCoords;
  }
}
