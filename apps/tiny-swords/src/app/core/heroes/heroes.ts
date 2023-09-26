import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { grid64 } from '../grid';
import { IController } from '../../controllers';

import { IPlayer } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { TCollisionArea, TPixelsCoords } from '../../abilities/abilities.types';
import { collisions } from '../collisions';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero({ id }: IPlayer, bounds: Array<TCollisionArea>, position: TPixelsCoords): Hero {
    const [initialX, initialY, height, width] = position;

    const hero = new Hero({
      controllerCreator: (hero) => collisions.decorateController(hero, bounds, new KeyboardController()),
      initialX,
      initialY,
      height,
      width,
      id,
    });

    this.addHero(hero);

    return hero;
  }

  initConnectedHero({ id }: IPlayer, position: TPixelsCoords): Hero {
    const [initialX, initialY, height, width] = position;

    const hero = new Hero({
      controllerCreator: () => new ServerController({ id }),
      initialX,
      initialY,
      height,
      width,
      id,
    });

    this.addHero(hero);

    return hero;
  }

  addHero(hero: Hero): void {
    const heroes = this.heroes.concat(hero);

    this.#heroesSubject.next(heroes);
  }

  getHero(player: IPlayer): Hero | undefined {
    return this.heroes.find(({ id }) => player.id === id);
  }

  #initDefaultHero(
    { id }: IPlayer,
    controller: IController,
    bounds: Array<TCollisionArea> = [],
    position: TPixelsCoords,
  ): Hero {
    const [initialX, initialY, height, width] = position;

    const hero = new Hero({
      controllerCreator: (hero) => collisions.decorateController(hero, bounds, controller),
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
