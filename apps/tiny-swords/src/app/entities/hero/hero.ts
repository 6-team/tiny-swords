import { HeroSounds } from './../../core/sounds/sounds';
import { Attacking } from '../../abilities/attacking';
import { Movable } from '../../abilities/movable';
import { IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { HeroType, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';
import { isMuttedStore } from '../../store/store';

const HERO_SIZE = 192;

export default class Hero extends Character<HeroType, HeroAbilities> implements IMovableCharacter {
  protected _sprite = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = HeroType.WARRIOR_BLUE;
  protected _size = HERO_SIZE;

  constructor({ controller, height, width, initialX, initialY, id }: HeroConfig) {
    super({
      abilities: {
        movable: new Movable({
          height,
          width,
          initialX,
          initialY,
          controller,
          getCollisionArea: (movable) => {
            const [x1, y1] = movable.coords;

            return [x1 + grid64.tileSize, y1 + grid64.tileSize, grid64.tileSize, grid64.tileSize];
          },
        }),
        attacking: new Attacking({ stream$: controller.attack$ }),
      },
      id,
    });

    const heroSounds = new HeroSounds({ controller });
    isMuttedStore.subscribe((value) => {
      if (value) {
        heroSounds.muteSound();
      } else {
        heroSounds.unmuteSound();
      }
    });
  }

  protected _getCoordsMap() {
    return mapHeroTypeToCoords;
  }
}
