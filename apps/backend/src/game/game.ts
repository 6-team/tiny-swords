import { MovingDirection, ILevelData, IEntity, Entity } from '@shared';

import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a game management class for handling heroes, enemies, and game levels.
 *
 * @template T - The entity type, typically representing heroes or enemies.
 * @template L - Type for game levels.
 */
export class Game<T extends IEntity = IEntity, L extends ILevelData = ILevelData> {
  #heroesMap = new Map();
  #enemiesMap = new Map();
  #level: L | null = null;

  /**
   * Gets the number of heroes in the game.
   *
   * @returns {number} The number of heroes in the game.
   */
  get heroesCount(): number {
    return this.#heroesMap.size;
  }

  /**
   * Gets the current game level.
   *
   * @returns {L | null} The current game level or null if not set.
   */
  get level(): L | null {
    return this.#level;
  }

  /**
   * Gets an array of heroes in the game.
   *
   * @returns {T[]} An array of hero entities.
   */
  get heroes(): T[] {
    return [...this.#heroesMap.values()];
  }

  /**
   * Gets an array of enemies in the game.
   *
   * @returns {T[]} An array of enemy entities.
   */
  get enemies(): T[] {
    return [...this.#enemiesMap.values()];
  }

  /**
   * Adds a hero to the game.
   *
   * @param {T} hero - The hero to add.
   */
  setHero(hero: T): void {
    this.#heroesMap.set(hero.id, hero);
  }

  /**
   * Adds an enemy to the game. If the enemy is dead, it will be removed.
   *
   * @param {T} enemy - The enemy to add.
   */
  setEnemy(enemy: T): void {
    if (enemy.isDied) {
      this.#enemiesMap.delete(enemy.id);
    }

    this.#enemiesMap.set(enemy.id, enemy);
  }

  /**
   * Sets the current game level.
   *
   * @param {L} level - The data of the current game level.
   */
  setLevel(level: L): void {
    this.#level = level;
    this.#initEnemies(level.enemies);
  }

  /**
   * Gets a hero by ID.
   *
   * @param {string} id - The ID of the hero.
   * @returns {T} The hero with the specified ID.
   */
  getHero(id: string): T {
    return this.#heroesMap.get(id);
  }

  /**
   * Checks if a hero with the specified ID exists in the game.
   *
   * @param {string} id - The ID of the hero to check.
   * @returns {boolean} true if the hero exists, otherwise false.
   */
  hasHero(id: string): boolean {
    return this.#heroesMap.has(id);
  }

  /**
   * Removes a hero from the game by ID.
   *
   * @param {string} id - The ID of the hero to remove.
   * @returns {boolean} true if the hero was successfully removed, otherwise false.
   */
  removeHero(id: string): boolean {
    return this.#heroesMap.delete(id);
  }

  /**
   * Removes an enemy from the game by ID.
   *
   * @param {string} id - The ID of the enemy to remove.
   * @returns {boolean} true if the enemy was successfully removed, otherwise false.
   */
  removeEnemy(id: string): boolean {
    return this.#enemiesMap.delete(id);
  }

  /**
   * Returns an array of IDs of other heroes in the game, excluding the current hero.
   *
   * @param {string} currentPlayerId - The ID of the current hero.
   * @returns {(string | number)[]} An array of IDs of other heroes in the game.
   */
  getOtherHeroIds(currentPlayerId: string): (string | number)[] {
    return this.getOtherHeroes(currentPlayerId).map(({ id }) => id);
  }

  /**
   * Returns an array of other heroes in the game, excluding the current hero.
   *
   * @param {string} currentPlayerId - The ID of the current hero.
   * @returns {T[]} An array of other heroes in the game.
   */
  getOtherHeroes(currentPlayerId: string): T[] {
    return this.heroes.flatMap((hero: T) => (hero.id !== currentPlayerId ? [hero] : []));
  }

  /**
   * Initializes enemies based on coordinates from the game level.
   *
   * @param {number[][]} enemiesCoords - Enemy coordinates.
   */
  #initEnemies(enemiesCoords: [number, number][]): void {
    this.#enemiesMap = enemiesCoords.reduce((map, coords) => {
      const enemy = new Entity({ id: uuidv4(), coords, direction: MovingDirection.IDLE });

      map.set(enemy.id, enemy);

      return map;
    }, new Map());
  }
}
