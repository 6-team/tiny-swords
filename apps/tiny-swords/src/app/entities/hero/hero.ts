import { IHeroSounds } from '@core/sounds/hero-sounds/hero-sounds.types';
import { Collecting } from '../../abilities/collecting';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { HeroType, mapHeroImages, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';
import { isMuttedStore } from '../../store/store';
import { HeroSounds } from '../../core/sounds';
import { IMoving, IMovingCharacter } from '../../abilities/moving/moving.types';
import { IFighting, IFightingCharacter } from '../../abilities/fighting/fighting.types';
import { ICollecting, ICollectingCharacter } from '../../abilities/collecting/collecting.types';
import { Fighting } from '../../abilities/fighting';
import { Moving } from '../../abilities/moving';

const HERO_SIZE = 192;

export default class Hero
  extends Character<HeroType, HeroAbilities>
  implements IMovingCharacter, IFightingCharacter, ICollectingCharacter
{
  protected _sprite: string;
  protected _type: HeroType;
  protected _size = HERO_SIZE;
  sounds: IHeroSounds;

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

        return [x1 + grid64.tileSize, y1 + grid64.tileSize, grid64.tileSize, grid64.tileSize];
      },
    });

    this._setAbilities({ moving, fighting, collecting });
    this._initSounds({ moving, fighting, collecting });
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

  get collecting() {
    return this.getAbility('collecting');
  }

  private _initSounds({
    moving,
    fighting,
    collecting,
  }: {
    moving: IMoving;
    fighting: IFighting;
    collecting: ICollecting;
  }): void {
    this.sounds = new HeroSounds({ moving, fighting, collecting });

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
