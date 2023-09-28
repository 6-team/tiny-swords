import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { IPlayer } from '@shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { TCollisionArea, TPixelsCoords } from '../../abilities/abilities.types';
import { collisions } from '../collisions';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  startPosition: TPixelsCoords;

  constructor(startPosition: TPixelsCoords) {
    this.startPosition = startPosition;
  }

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero({ id }: IPlayer, bounds$: Observable<Array<TCollisionArea>>): Hero {
    const [initialX, initialY, height, width] = this.startPosition;

    const hero = new Hero({
      controllerCreator: (hero) => collisions.decorateController(hero, bounds$, new KeyboardController()),
      initialX,
      initialY,
      height,
      width,
      id,
    });

    this.addHero(hero);

    return hero;
  }

  initConnectedHero({ id }: IPlayer): Hero {
    const [initialX, initialY, height, width] = this.startPosition;

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

  getHero(player: { id: string }): Hero | undefined {
    return this.heroes.find(({ id }) => player.id === id);
  }
}
