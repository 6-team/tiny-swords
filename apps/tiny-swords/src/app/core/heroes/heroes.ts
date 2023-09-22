import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { grid64 } from '../grid';
import { IController } from '../../controllers';

import { IPlayer, MovingDirection } from '@shared';
import { BehaviorSubject, filter } from 'rxjs';
import { IMovable, TMovableDimentions } from '../../abilities/abilities.types';
import { IMovableCharacter } from '../../common/common.types';

function createCollisionDecorator(bounds: Array<TMovableDimentions>) {
  return (character: IMovableCharacter, controller: IController): IController => {
    const movable = character.getAbility('movable');

    return {
      ...controller,
      movement$: controller.movement$.pipe(
        filter((direction) => {
          for (const bound of bounds) {
            const nextCollisionArea = movable.getNextCollisionArea(direction);
            const hasCollision = movable.checkCollision(bound, nextCollisionArea);

            if (hasCollision) {
              return false;
            }
          }

          return true;
        }),
      ),
    };
  };
}

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero(player: IPlayer, bounds: Array<TMovableDimentions>): Hero {
    return this.#initDefaultHero(player, new KeyboardController(), bounds);
  }

  initConnectedHero(player: IPlayer): Hero {
    return this.#initDefaultHero(player, new ServerController());
  }

  addHero(hero: Hero): void {
    const heroes = this.heroes.concat(hero);

    this.#heroesSubject.next(heroes);
  }

  getHero(player: IPlayer): Hero | undefined {
    return this.heroes.find(({ id }) => player.id === id);
  }

  #initDefaultHero({ id }: IPlayer, controller: IController, bounds: Array<TMovableDimentions> = []): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(0, 1, 3, 3);
    const collisionDecorator = createCollisionDecorator(bounds);
    const hero = new Hero({
      controllerCreator: (hero) => collisionDecorator(hero, controller),
      initialX,
      initialY,
      height,
      width,
      id,
    });

    this.addHero(hero);

    return hero;
  }
}
