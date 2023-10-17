import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { IPlayer } from '@shared';
import { BehaviorSubject, Observable, concatAll, filter, map, merge, mergeMap } from 'rxjs';
import { TCollisionArea, TPixelsCoords } from '../../abilities/abilities.types';
import { collisions } from '../collisions';
import { grid64 } from '../grid';
import { CoordsTuple } from '../../entities/tile/tile.types';
import { HeroType } from '../../entities/hero/hero.const';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();
  readonly heroesBoundaries$ = this.#initHeroesBoundaries();

  #startCoords: CoordsTuple;
  #mainHero: Hero;

  constructor(startCoords: CoordsTuple) {
    this.#startCoords = startCoords;
  }

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  get mainHero(): Hero {
    return this.#mainHero;
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
    this.#mainHero = hero;

    return hero;
  }

  initConnectedHero({ id, coords: [startX, startY] }: IPlayer): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);
    const type = this.#getUniqueType();

    const hero = new Hero({
      controllerCreator: () => new ServerController({ id }),
      initialX,
      initialY,
      height,
      width,
      id,
      type,
    });

    this.addHero(hero);

    return hero;
  }

  addHero(hero: Hero): void {
    const heroes = this.heroes.concat(hero);

    this.#heroesSubject.next(heroes);
  }

  removeHero(id: string | number): void {
    const heroes = this.heroes.filter((hero) => hero.id !== id);

    this.#heroesSubject.next(heroes);
  }

  getHero(id: string | number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  isMainHero(id: string | number): boolean {
    return this.#mainHero.id === id;
  }

  #getUniqueType(): HeroType {
    const types = Object.values(HeroType)
      .filter((type) => Number.isFinite(type))
      .filter((type) => !this.heroes.find((hero) => hero.type === type)) as HeroType[];

    return types.at(0) || HeroType.WARRIOR_BLUE;
  }

  #initHeroesBoundaries(): Observable<TPixelsCoords[]> {
    const boundaries$ = this.heroes$.pipe(
      filter((heroes) => !!heroes.length),
      concatAll(),
      mergeMap((hero) => hero.getAbility('movable').coords$),
      map(() => this.heroes.map((enemy) => enemy.getAbility('movable').getCollisionArea())),
    );
    const emptyBoundary$ = this.heroes$.pipe(
      filter((heroes) => !heroes.length),
      map(() => []),
    );

    return merge(boundaries$, emptyBoundary$);
  }
}
