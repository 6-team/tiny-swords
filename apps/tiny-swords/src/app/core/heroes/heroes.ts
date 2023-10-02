import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { IPlayer } from '@shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { TCollisionArea } from '../../abilities/abilities.types';
import { collisions } from '../collisions';
import { grid64 } from '../grid';
import { CoordsTuple } from '../../entities/tile/tile.types';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  #startCoords: CoordsTuple;

  constructor(startCoords: CoordsTuple) {
    this.#startCoords = startCoords;
  }

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero({ id }: IPlayer, bounds$: Observable<Array<TCollisionArea>>): Hero {
    const [x, y] = this.#startCoords;
    const [initialX, initialY, height, width] = grid64.transformToPixels(x - 1, y - 1, 3, 3);

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

  initConnectedHero({ id, coords: [startX, startY] }: IPlayer): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);

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
