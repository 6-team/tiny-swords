import { Entity, ILevelData, MovingDirection, IEntity } from '@shared';
import { Game } from './game';

describe('Game', () => {
  let game: Game<IEntity, ILevelData>;

  beforeEach(() => {
    game = new Game();
  });

  it('should initialize with no heroes and no level', () => {
    expect(game.heroesCount).toBe(0);
    expect(game.level).toBeNull();
  });

  it('should set and get heroes', () => {
    const hero1 = new Entity({ id: 'hero1', coords: [0, 0], direction: MovingDirection.UP });
    const hero2 = new Entity({ id: 'hero2', coords: [1, 1], direction: MovingDirection.DOWN });

    game.setHero(hero1);
    game.setHero(hero2);

    expect(game.heroesCount).toBe(2);
    expect(game.getHero(hero1.id)).toEqual(hero1);
    expect(game.getHero(hero2.id)).toEqual(hero2);
    expect(game.hasHero(hero1.id)).toBe(true);
    expect(game.hasHero('some id')).toBe(false);
  });

  it('should remove heroes', () => {
    const hero1 = new Entity({ id: 'hero1', coords: [0, 0], direction: MovingDirection.UP });

    game.setHero(hero1);

    expect(game.removeHero(hero1.id)).toBe(true);
    expect(game.heroesCount).toBe(0);
    expect(game.hasHero(hero1.id)).toBe(false);
    expect(game.removeHero(hero1.id)).toBe(false);
  });

  it('should set and remove enemies', () => {
    const enemy1 = new Entity({ id: 'enemy1', coords: [2, 2], direction: MovingDirection.LEFT });
    const enemy2 = new Entity({ id: 'enemy2', coords: [3, 3], direction: MovingDirection.RIGHT });

    game.setEnemy(enemy1);
    game.setEnemy(enemy2);

    expect(game.enemies.length).toBe(2);

    expect(game.removeEnemy('enemy1')).toBe(true);
    expect(game.enemies.length).toBe(1);
    expect(game.removeEnemy('enemy1')).toBe(false);
  });

  it('should set and get the level', () => {
    const levelData: ILevelData = {
      enemies: [
        [4, 4],
        [5, 5],
      ],
    } as ILevelData;
    game.setLevel(levelData);
    expect(game.level).toEqual(levelData);
  });

  it('should return other hero IDs and heroes', () => {
    const hero1 = new Entity({ id: 'hero1', coords: [0, 0], direction: MovingDirection.UP });
    const hero2 = new Entity({ id: 'hero2', coords: [1, 1], direction: MovingDirection.DOWN });
    const hero3 = new Entity({ id: 'hero3', coords: [2, 2], direction: MovingDirection.LEFT });

    game.setHero(hero1);
    game.setHero(hero2);
    game.setHero(hero3);

    const currentPlayerId = hero2.id;
    const otherPlayerIds = game.getOtherHeroIds(currentPlayerId);
    const otherheroes = game.getOtherHeroes(currentPlayerId);

    expect(otherPlayerIds).toEqual([hero1.id, hero3.id]);
    expect(otherheroes).toEqual([hero1, hero3]);
  });
});
