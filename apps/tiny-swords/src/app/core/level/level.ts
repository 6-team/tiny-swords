import { ILevelData } from '@shared';
import { Layers } from '@core/layers';
import { randomElement } from '@core/layers';
import { SIZE_X, SIZE_Y } from '@common/common.const';
import { LayersMap } from '@core/layers';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { grid64 } from '@core/grid';
import { TCollisionArea } from '@abilities/abilities.types';
import { Resource } from '@entities/resource';
import { LevelType } from './level.types';

/**
 * Represents a Level class responsible for managing and providing level data.
 */
export class Level {
  private _currentLevelType;
  private _nextLevelType;
  private _data: ILevelData<LayersMap, Resource>;

  // Observables for various properties
  readonly _boundariesSubject = new BehaviorSubject<[number, number][]>([]);
  readonly _gridXSubject = new BehaviorSubject<number>(0);
  readonly _gridYSubject = new BehaviorSubject<number>(0);
  readonly _startCoordsSubject = new BehaviorSubject<[number, number]>([0, 0]);
  readonly _endCoordsSubject = new BehaviorSubject<[number, number]>([0, 0]);
  readonly _enemiesCoordsSubject = new BehaviorSubject<[number, number][]>([]);
  readonly _mapsSubject = new BehaviorSubject<LayersMap[]>([]);
  readonly _resourcesSubject = new BehaviorSubject<Resource[]>([]);

  // Public observables
  readonly startCoords$ = this._startCoordsSubject.asObservable();
  readonly endCoords$ = this._endCoordsSubject.asObservable();
  readonly maps$ = this._mapsSubject.asObservable();
  readonly resources$ = this._resourcesSubject.asObservable();
  readonly enemiesCoords$ = this._enemiesCoordsSubject.asObservable();
  readonly boundaries$ = this._boundariesSubject
    .asObservable()
    .pipe(map((bounds): TCollisionArea[] => bounds.map(([x, y]) => grid64.transformToPixels(x, y, 1, 1))));

  /**
   * Constructs a new Level instance and initializes it.
   */
  constructor() {
    this.next();
  }

  /**
   * Retrieves the current level data.
   *
   * @returns {LevelData<LayersMap, Resource>} The current level data.
   */
  get data(): ILevelData<LayersMap, Resource> {
    return this._data;
  }

  /**
   * Retrieves the grid X-coordinate.
   *
   * @returns {number} The X-coordinate of the grid.
   */
  get gridX(): number {
    return this._gridXSubject.getValue();
  }

  /**
   * Retrieves the grid Y-coordinate.
   *
   * @returns {number} The Y-coordinate of the grid.
   */
  get gridY(): number {
    return this._gridYSubject.getValue();
  }

  /**
   * Retrieves the starting coordinates.
   *
   * @returns {[number, number]} The starting coordinates as an array [x, y].
   */
  get startCoords(): [number, number] {
    return this._startCoordsSubject.getValue();
  }

  /**
   * Retrieves the resources available in the level.
   *
   * @returns {Resource[]} An array of resource objects.
   */
  get resources(): Resource[] {
    return this._resourcesSubject.getValue();
  }

  /**
   * Retrieves the coordinates of enemies in the level.
   *
   * @returns {[number, number][]} An array of enemy coordinates.
   */
  get enemiesCoords(): [number, number][] {
    return this._enemiesCoordsSubject.getValue();
  }

  /**
   * Updates the level data with the provided information.
   *
   * @param {LevelData<LayersMap, Resource>} levelData - The data representing the level.
   */
  updateLevel(levelData: ILevelData<LayersMap, Resource>): void {
    const { gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies } = levelData;

    this._data = levelData;
    this._boundariesSubject.next(boundaries);
    this._startCoordsSubject.next(startCoords);
    this._endCoordsSubject.next(endCoords);
    this._mapsSubject.next(maps);
    this._gridXSubject.next(gridX);
    this._gridYSubject.next(gridY);
    this._resourcesSubject.next(resources);
    this._enemiesCoordsSubject.next(enemies);
  }

  /**
   * Updates the resource data for the level.
   *
   * @param {Resource[]} resources - An array of resource objects.
   */
  updateResources(resources: Resource[]): void {
    this._resourcesSubject.next(resources);
  }

  /**
   * Generates the next level data and returns it as an observable.
   *
   * @returns {Observable<LevelData<LayersMap>>} An observable that emits the next level data.
   */
  next(): Observable<ILevelData<LayersMap>> {
    const levels = [LevelType.Ground, LevelType.Sand, LevelType.Stones];
    
    this._currentLevelType = typeof this._nextLevelType === 'number'
      ? this._nextLevelType
      : randomElement(levels);

    this._nextLevelType = randomElement(levels.filter((level) => level !== this._currentLevelType));

    const border = this._currentLevelType === LevelType.Stones ? 2 : randomElement([1, 2]);

    const { gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies } = new Layers(
      this._currentLevelType,
      this._nextLevelType,
      SIZE_X,
      SIZE_Y,
      border,
    );

    this.updateLevel({ gridX, gridY, startCoords, endCoords, maps, boundaries, resources, enemies });

    return of(this.data);
  }
}
