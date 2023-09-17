import { Attacking } from '../../abilities/attacking';
import { Movable } from '../../abilities/movable';
import { IMovableCharacter } from '../../common/common.types';
import { Character } from '../character';
import { HeroType, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';

const HERO_SIZE = 192;

export default class Hero extends Character<HeroType, HeroAbilities> implements IMovableCharacter {
  protected _sprite: string = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = HeroType.WARRIOR_BLUE;
  protected _size = HERO_SIZE;

  constructor({ controller, height, width, initialX, initialY }: HeroConfig) {
    super({
      abilities: {
        movable: new Movable({ height, width, initialX, initialY, stream$: controller.movement$ }),
        attacking: new Attacking({ stream$: controller.attack$ }),
      },
    });
  }

  protected _getCoordsMap() {
    return mapHeroTypeToCoords;
  }
}