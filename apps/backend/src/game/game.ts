import { MovingDirection, ILevelData, IEntity, Entity } from '@shared';

import { v4 as uuidv4 } from 'uuid';

/**
 * Представляет класс управления игрой для обработки героев, врагов и уровней игры.
 *
 * @template T - Тип сущности, обычно представляющей героев или врагов.
 * @template L - Тип для игровых уровней.
 */
export class Game<T extends IEntity = IEntity, L extends ILevelData = ILevelData> {
  #heroesMap = new Map();
  #enemiesMap = new Map();
  #level: L | null = null;

  /**
   * Получает количество героев в игре.
   *
   * @returns {number} Количество героев в игре.
   */
  get heroesCount(): number {
    return this.#heroesMap.size;
  }

  /**
   * Получает текущий уровень игры.
   *
   * @returns {L | null} Текущий уровень игры или null, если не установлен.
   */
  get level(): L | null {
    return this.#level;
  }

  /**
   * Получает массив героев в игре.
   *
   * @returns {T[]} Массив сущностей героев.
   */
  get heroes(): T[] {
    return [...this.#heroesMap.values()];
  }

  /**
   * Получает массив врагов в игре.
   *
   * @returns {T[]} Массив сущностей врагов.
   */
  get enemies(): T[] {
    return [...this.#enemiesMap.values()];
  }

  /**
   * Добавляет героя в игру.
   *
   * @param {T} hero - Герой для добавления.
   */
  setHero(hero: T): void {
    this.#heroesMap.set(hero.id, hero);
  }

  /**
   * Добавляет врага в игру. Если враг умер, он удаляется.
   *
   * @param {T} enemy - Враг для добавления.
   */
  setEnemy(enemy: T): void {
    if (enemy.isDied) {
      this.#enemiesMap.delete(enemy.id);
    }

    this.#enemiesMap.set(enemy.id, enemy);
  }

  /**
   * Устанавливает текущий уровень игры.
   *
   * @param {L} level - Данные текущего уровня игры.
   */
  setLevel(level: L): void {
    this.#level = level;
    this.#initEnemies(level.enemies);
  }

  /**
   * Получает героя по ID.
   *
   * @param {string} id - ID героя.
   * @returns {T} Герой с указанным ID.
   */
  getHero(id: string): T {
    return this.#heroesMap.get(id);
  }

  /**
   * Проверяет наличие героя с указанным ID в игре.
   *
   * @param {string} id - ID героя для проверки.
   * @returns {boolean} true, если герой существует, иначе false.
   */
  hasHero(id: string): boolean {
    return this.#heroesMap.has(id);
  }

  /**
   * Удаляет героя из игры по ID.
   *
   * @param {string} id - ID героя для удаления.
   * @returns {boolean} true, если герой был успешно удален, иначе false.
   */
  removeHero(id: string): boolean {
    return this.#heroesMap.delete(id);
  }

  /**
   * Удаляет врага из игры по ID.
   *
   * @param {string} id - ID врага для удаления.
   * @returns {boolean} true, если враг был успешно удален, иначе false.
   */
  removeEnemy(id: string): boolean {
    return this.#enemiesMap.delete(id);
  }

  /**
   * Возвращает массив ID других героев в игре, исключая текущего героя.
   *
   * @param {string} currentPlayerId - ID текущего героя.
   * @returns {(string | number)[]} Массив ID других героев в игре.
   */
  getOtherHeroIds(currentPlayerId: string): (string | number)[] {
    return this.getOtherHeroes(currentPlayerId).map(({ id }) => id);
  }

  /**
   * Возвращает массив других героев в игре, исключая текущего героя.
   *
   * @param {string} currentPlayerId - ID текущего героя.
   * @returns {T[]} Массив других героев в игре.
   */
  getOtherHeroes(currentPlayerId: string): T[] {
    return this.heroes.flatMap((hero: T) => (hero.id !== currentPlayerId ? [hero] : []));
  }

  /**
   * Инициализирует врагов на основе координат из уровня игры.
   *
   * @param {number[][]} enemiesCoords - Координаты врагов.
   */
  #initEnemies(enemiesCoords: [number, number][]): void {
    this.#enemiesMap = enemiesCoords.reduce((map, coords) => {
      const enemy = new Entity({ id: uuidv4(), coords, direction: MovingDirection.IDLE });

      map.set(enemy.id, enemy);

      return map;
    }, new Map());
  }
}
