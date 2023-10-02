import { LevelData } from './level-data';
import { Player } from './player';

export class Game<T extends Player, L = LevelData> {
  #playersMap = new Map();
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

  setPlayer(player: T): void {
    this.#playersMap.set(player.id, player);
  }

  setLevel(level: L): void {
    this.#level = level;
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

  getOtherPlayerIds(currentPlayerId: string): string[] {
    return this.getOtherPlayers(currentPlayerId).map(({ id }) => id);
  }

  getOtherPlayers(currentPlayerId: string): Player[] {
    return this.players.flatMap((player: T) => (player.id !== currentPlayerId ? [player] : []));
  }
}
