import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { grid64 } from '../grid';
import { IController } from '../../controllers';

import { IPlayer } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { TCollisionArea } from '../../abilities/abilities.types';
import { collisions } from '../collisions';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero(player: IPlayer, bounds: Array<TCollisionArea>): Hero {
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

  #initDefaultHero({ id }: IPlayer, controller: IController, bounds: Array<TCollisionArea> = []): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(0, 1, 3, 3);

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
