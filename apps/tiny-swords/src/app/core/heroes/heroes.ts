import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { IPlayer, MovingDirection } from '@shared';
import { BehaviorSubject, Observable, concatAll, filter, map, merge, mergeMap } from 'rxjs';
import { TCollisionArea, TPixelsCoords } from '../../abilities/abilities.types';
import { collisions } from '../collisions';
import { grid64 } from '../grid';
import { CoordsTuple } from '../../entities/tile/tile.types';
import { HeroType } from '../../entities/hero/hero.const';
import { MouseController } from '../../controllers/mouse';
import { IMovingCharacter } from '../../abilities/moving/moving.types';

export class Heroes {
  private _mainHero$ = new BehaviorSubject<Hero | null>(null);

  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();
  readonly heroesBoundaries$ = this.#initHeroesBoundaries();
  readonly mainHero$ = this._mainHero$.asObservable();

  #startCoords: CoordsTuple;

  constructor(startCoords: CoordsTuple) {
    this.#startCoords = startCoords;
  }

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  get mainHero(): Hero {
    return this._mainHero$.getValue();
  }

  initHero(
    { id }: IPlayer,
    bounds$: Observable<Array<TCollisionArea>>,
    enemies$: Observable<Array<IMovingCharacter>>,
  ): Hero {
    const [x, y] = this.#startCoords;
    const [initialX, initialY, height, width] = grid64.transformToPixels(x - 1, y - 1, 3, 3);

    const hero = new Hero({
      initialX,
      initialY,
      height,
      width,
      id,
    });

    new MouseController({ character: hero });
    new KeyboardController({
      character: hero,
      streamDecorator: (originalStream$: Observable<MovingDirection>) =>
        collisions.preventBoundsDecorator({ character: hero, otherCharacters$: enemies$, bounds$, originalStream$ }),
    });

    this.addHero(hero);
    this._mainHero$.next(hero);

    return hero;
  }

  initConnectedHero({ id, coords: [startX, startY] }: IPlayer): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);
    const type = this.#getUniqueType();

    const hero = new Hero({
      initialX,
      initialY,
      height,
      width,
      id,
      type,
    });

    new ServerController({ id, character: hero });

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
    return this.mainHero?.id === id;
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
      mergeMap((hero) => hero.moving.coords$),
      map(() => this.heroes.map((enemy) => enemy.moving.getCollisionArea())),
    );
    const emptyBoundary$ = this.heroes$.pipe(
      filter((heroes) => !heroes.length),
      map(() => []),
    );

    return merge(boundaries$, emptyBoundary$);
  }
}
