import { IHeroSounds } from './../../core/sounds/hero-sounds.types';
import { Attacking } from '../../abilities/attacking';
import { Collecting } from '../../abilities/collecting';
import { Movable } from '../../abilities/movable';
import { IAttackingCharacter, ICollectingCharacter, IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { HeroType, mapHeroImages, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';
import { isMuttedStore } from '../../store/store';
import { HeroSounds } from '../../core/sounds';
import { IAttacking, ICollecting, IMovable } from '../../abilities';

const HERO_SIZE = 192;

export default class Hero
  extends Character<HeroType, HeroAbilities>
  implements IMovableCharacter, IAttackingCharacter, ICollectingCharacter
{
  protected _sprite: string;
  protected _type: HeroType;
  protected _size = HERO_SIZE;
  sounds: IHeroSounds;

  constructor({ height, width, initialX, initialY, id, type = HeroType.WARRIOR_BLUE }: HeroConfig) {
    super({ id });

    this._type = type;
    this._sprite = mapHeroImages[type];

    const attacking = new Attacking({ availibleLives: 1, blockedLives: 2 });
    const collecting = new Collecting();
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

    this._setAbilities({ movable, attacking, collecting });
    this._initSounds({ movable, attacking, collecting });
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

  get collecting() {
    return this.getAbility('collecting');
  }

  private _initSounds({
    movable,
    attacking,
    collecting,
  }: {
    movable: IMovable;
    attacking: IAttacking;
    collecting: ICollecting;
  }): void {
    this.sounds = new HeroSounds({ movable, attacking, collecting });

    isMuttedStore.subscribe((value) => {
      if (value) {
        this.sounds.muteSound();
      } else {
        this.sounds.unmuteSound();
      }
    });
  }

  protected _getCoordsMap() {
    return mapHeroTypeToCoords;
  }
}
