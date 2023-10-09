import { HeroSounds } from './../../core/sounds/sounds';
import { Attacking } from '../../abilities/attacking';
import { Collecting } from '../../abilities/collecting';
import { Movable } from '../../abilities/movable';
import { IAttackingCharacter, ICollectingCharacter, IMovableCharacter } from '../../common/common.types';
import { grid64 } from '../../core/grid';
import { Character } from '../character';
import { HeroType, mapHeroTypeToCoords } from './hero.const';
import { HeroAbilities, HeroConfig } from './hero.types';
import { isMuttedStore } from '../../store/store';

const HERO_SIZE = 192;

export default class Hero
  extends Character<HeroType, HeroAbilities>
  implements IMovableCharacter, IAttackingCharacter, ICollectingCharacter
{
  protected _sprite = '/img/Factions/Knights/Troops/Warrior/Blue/Warrior_Blue.png';
  protected _type = HeroType.WARRIOR_BLUE;
  protected _size = HERO_SIZE;

  constructor({ controllerCreator, height, width, initialX, initialY, id }: HeroConfig) {
    super({ id });

    const attacking = new Attacking();
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

    this._setAbilities({
      movable,
      attacking,
      collecting,
    });

    const controller = controllerCreator(this);

    movable.setController(controller);
    attacking.setController(controller);

    const heroSounds = new HeroSounds({ controller, collecting });
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
