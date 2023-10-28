import { Enemies } from './enemies';
import { of } from 'rxjs';

jest.mock('@entities/enemy', () => {
  return {
    Enemy: jest.fn().mockImplementation((enemy) => {
      return enemy;
    }),
  };
});

jest.mock('@controllers/AI', () => {
  return {
    AIController: jest.fn().mockImplementation((controller) => {
      return controller;
    }),
  };
});

describe('Enemies', () => {
  let enemy;

  const enemies = new Enemies();

  beforeAll(() => {
    enemy = enemies.initEnemy({ id: '1', coords: [1, 1] }, of([]), of([]), of(null));
    console.log(enemy);
  });

  afterEach(() => {
    enemies.clearEnemies();
  });

  it('should retrieve an enemy by ID', () => {
    console.log(enemies.enemies);
    const retrievedEnemy = enemies.getEnemy('1');

    expect(retrievedEnemy).toBe(enemy);
  });

  it('should add an enemy to the collection', () => {
    const newEnemy = enemies.initEnemy({ id: '2', coords: [2, 2] }, of([]), of([]), of(null));

    expect(enemies.enemies).toContain(newEnemy);
  });

  it('should remove an enemy from the collection by ID', () => {
    enemies.removeEnemy('1');

    expect(enemies.enemies).not.toContain(enemy);
  });

  it('should clear all enemies from the collection', () => {
    enemies.clearEnemies();

    expect(enemies.enemies).toHaveLength(0);
  });
});
