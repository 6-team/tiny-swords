import { ILevelData } from '@shared';
import { Layers } from '../layers/layers';
import { randomElement } from '../layers/layers.utils';
import { SIZE_X, SIZE_Y } from '../../common/common.const';
import { LayersMap } from '../layers/layers.types';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { grid64 } from '../grid';
import { TCollisionArea } from '../../abilities/abilities.types';
import { Resource } from '../../entities/resource';
import { LevelType } from './level.types';

export class Level {
  #levelCounter = 1;
  #currentLevelType;
  #nextLevelType;

  readonly #boundariesSubject = new BehaviorSubject<[number, number][]>([]);
  readonly #gridXSubject = new BehaviorSubject<number>(0);
  readonly #gridYSubject = new BehaviorSubject<number>(0);
  readonly #startCoordsSubject = new BehaviorSubject<[number, number]>([0, 0]);
  readonly #endCoordsSubject = new BehaviorSubject<[number, number]>([0, 0]);
  readonly #enemiesCoordsSubject = new BehaviorSubject<[number, number][]>([]);
  readonly #mapsSubject = new BehaviorSubject<LayersMap[]>([]);
  readonly #resourcesSubject = new BehaviorSubject<Resource[]>([]);

  readonly startCoords$ = this.#startCoordsSubject.asObservable();
  readonly endCoords$ = this.#endCoordsSubject.asObservable();
  readonly maps$ = this.#mapsSubject.asObservable();
  readonly resources$ = this.#resourcesSubject.asObservable();
  readonly enemiesCoords$ = this.#enemiesCoordsSubject.asObservable();
  readonly boundaries$ = this.#boundariesSubject
    .asObservable()
    .pipe(map((bounds): TCollisionArea[] => bounds.map(([x, y]) => grid64.transformToPixels(x, y, 1, 1))));

  #data: ILevelData<LayersMap, Resource>;

  constructor() {
    this.next();
  }

  get data(): ILevelData<LayersMap, Resource> {
    return this.#data;
  }

  get gridX(): number {
    return this.#gridXSubject.getValue();
  }

  get gridY(): number {
    return this.#gridYSubject.getValue();
  }

  get startCoords(): [number, number] {
    return this.#startCoordsSubject.getValue();
  }

  get resources(): Resource[] {
    return this.#resourcesSubject.getValue();
  }

  get enemiesCoords(): [number, number][] {
    return this.#enemiesCoordsSubject.getValue();
  }

  updateLevel(levelData: ILevelData<LayersMap, Resource>): void {
    const { gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies } = levelData;

    this.#data = levelData;
    this.#boundariesSubject.next(boundaries);
    this.#startCoordsSubject.next(startCoords);
    this.#endCoordsSubject.next(endCoords);
    this.#mapsSubject.next(maps);
    this.#gridXSubject.next(gridX);
    this.#gridYSubject.next(gridY);
    this.#resourcesSubject.next(resources);
    this.#enemiesCoordsSubject.next(enemies);
  }

  updateResources(resources: Resource[]): void {
    this.#resourcesSubject.next(resources);
  }

  next(): Observable<ILevelData<LayersMap>> {
    // console.time();
    const levels = [LevelType.Ground, LevelType.Sand, LevelType.Stones];

    this.#currentLevelType = typeof this.#nextLevelType === 'number' ? this.#nextLevelType : randomElement(levels);

    this.#nextLevelType = randomElement(levels.filter((level) => level !== this.#currentLevelType));

    const border = this.#currentLevelType === LevelType.Stones ? 2 : randomElement([1, 2]);

    const { gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies } = new Layers(
      this.#currentLevelType,
      this.#nextLevelType,
      SIZE_X,
      SIZE_Y,
      border,
    );

    // console.timeEnd();

    this.updateLevel({ gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies });

    return of(this.data);
  }
}
