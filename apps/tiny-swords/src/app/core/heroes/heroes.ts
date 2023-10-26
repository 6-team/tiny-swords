import { BehaviorSubject, Observable, concatAll, filter, map, merge, mergeMap } from 'rxjs';

import { IEntity, MovingDirection } from '@shared';

import { IMovingCharacter } from '@abilities/moving';
import { TCollisionArea, TPixelsCoords } from '@abilities/abilities.types';
import { CoordsTuple } from '@entities/tile';
import { HeroType, Hero } from '@entities/hero';
import { KeyboardController } from '@controllers/keyboard';
import { ServerController } from '@controllers/server';
import { MouseController } from '@controllers/mouse';
import { collisions } from '@core/collisions';
import { grid64 } from '@core/grid';

/**
 * Represents a collection of hero characters in the game.
 */
export class Heroes {
  private readonly _mainHero$ = new BehaviorSubject<Hero | null>(null);
  private readonly _heroesSubject = new BehaviorSubject<Hero[]>([]);

  /**
   * An observable of hero characters.
   * @type {Observable<Hero[]>}
   */
  readonly heroes$ = this._heroesSubject.asObservable();

  /**
   * An observable of pixel coordinates representing hero character boundaries.
   * @type {Observable<TPixelsCoords[]>}
   */
  readonly heroesBoundaries$ = this.initHeroesBoundaries();

  /**
   * An observable of the main hero character.
   * @type {Observable<Hero | null>}
   */
  readonly mainHero$ = this._mainHero$.asObservable();

  private _startCoords: CoordsTuple;

  /**
   * Creates a new Heroes collection with a starting position for heroes.
   * @param {CoordsTuple} startCoords - The starting coordinates for heroes.
   */
  constructor(startCoords: CoordsTuple) {
    this._startCoords = startCoords;
  }

  /**
   * Get the array of hero characters.
   * @type {Hero[]}
   */
  get heroes(): Hero[] {
    return this._heroesSubject.getValue();
  }

  /**
   * Get the main hero character.
   * @type {Hero | null}
   */
  get mainHero(): Hero {
    return this._mainHero$.getValue();
  }

  /**
   * Initializes a hero character.
   * @param {IEntity} entity - The entity information for the hero character.
   * @param {Observable<Array<TCollisionArea>>} bounds$ - Observable of collision boundaries.
   * @param {Observable<Array<IMovableCharacter>>} enemies$ - Observable of enemy characters.
   * @returns {Hero} - The newly initialized hero character.
   */
  initHero(
    { id }: IEntity,
    bounds$: Observable<Array<TCollisionArea>>,
    enemies$: Observable<Array<IMovingCharacter>>,
  ): Hero {
    const [x, y] = this._startCoords;
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

  /**
   * Initializes a hero character from a connected entity.
   * @param {IEntity} entity - The connected entity information for the hero character.
   * @returns {Hero} - The newly initialized hero character.
   */
  initConnectedHero({ id, coords: [startX, startY] }: IEntity): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(startX - 1, startY - 1, 3, 3);
    const type = this.getUniqueType();

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

  /**
   * Adds a hero character to the collection.
   * @param {Hero} hero - The hero character to add.
   */
  addHero(hero: Hero): void {
    const heroes = this.heroes.concat(hero);

    this._heroesSubject.next(heroes);
  }

  /**
   * Removes a hero character from the collection by ID.
   * @param {string | number} id - The ID of the hero character to remove.
   */
  removeHero(id: string | number): void {
    const heroes = this.heroes.filter((hero) => hero.id !== id);

    this._heroesSubject.next(heroes);
  }

  /**
   * Retrieves a hero character by ID.
   * @param {string | number} id - The ID of the hero character to retrieve.
   * @returns {Hero | undefined} - The hero character or undefined if not found.
   */
  getHero(id: string | number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  /**
   * Checks if a hero character is the main hero.
   * @param {string | number} id - The ID of the hero character to check.
   * @returns {boolean} - `true` if the hero is the main hero, otherwise `false`.
   */
  isMainHero(id: string | number): boolean {
    return this.mainHero?.id === id;
  }

  private getUniqueType(): HeroType {
    const types = Object.values(HeroType)
      .filter((type) => Number.isFinite(type))
      .filter((type) => !this.heroes.find((hero) => hero.type === type)) as HeroType[];

    return types.at(0) || HeroType.WARRIOR_BLUE;
  }

  private initHeroesBoundaries(): Observable<TPixelsCoords[]> {
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
