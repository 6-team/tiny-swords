import { MovingDirection } from '../enums';
import { LevelData } from './level-data';
import { Player } from './player';
import { v4 as uuidv4 } from 'uuid';

export class Game<T extends Player<MovingDirection>, L extends LevelData = LevelData> {
  #playersMap = new Map();
  #enemiesMap = new Map();
  #level: L | null = null;

  get playersCount(): number {
    return this.#playersMap.size;
  }

  get level(): L | null {
    return this.#level;
  }

  get players(): T[] {
    return [...this.#playersMap.values()];
  }

  get enemies(): T[] {
    return [...this.#enemiesMap.values()];
  }

  setPlayer(player: T): void {
    this.#playersMap.set(player.id, player);
  }

  setEnemy(enemy: T): void {
    if (enemy.isDied) {
      this.#enemiesMap.delete(enemy.id);
    }

    this.#enemiesMap.set(enemy.id, enemy);
  }

  setLevel(level: L): void {
    this.#level = level;
    this.#initEnemies(level.enemies);
  }

  getPlayer(id: string): T {
    return this.#playersMap.get(id);
  }

  hasPlayer(id: string): boolean {
    return this.#playersMap.has(id);
  }

  removePlayer(id: string): boolean {
    return this.#playersMap.delete(id);
  }

  removeEnemy(id: string): boolean {
    return this.#enemiesMap.delete(id);
  }

  getOtherPlayerIds(currentPlayerId: string): (string | number)[] {
    return this.getOtherPlayers(currentPlayerId).map(({ id }) => id);
  }

  getOtherPlayers(currentPlayerId: string): Player[] {
    return this.players.flatMap((player: T) => (player.id !== currentPlayerId ? [player] : []));
  }

  #initEnemies(enemiesCoords: [number, number][]): void {
    this.#enemiesMap = enemiesCoords.reduce((map, coords) => {
      const enemy = { id: uuidv4(), coords, direction: MovingDirection.IDLE };

      map.set(enemy.id, enemy);

      return map;
    }, new Map());
  }
}
