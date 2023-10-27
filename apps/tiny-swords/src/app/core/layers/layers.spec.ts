import { LevelType } from '@core/level';
import { Layers } from './layers';

describe('Layers', () => {
  const level = LevelType.Ground;
  const nextLevel = LevelType.Sand;
  const gridX = 10;
  const gridY = 10;
  const border = 1;
  const layers = new Layers(level, nextLevel, gridX, gridY, border);

  it('should return an array of boundaries for collisions with static map objects', () => {
    const boundaries = layers.boundaries;

    expect(Array.isArray(boundaries)).toBe(true);
  });

  it('should return an array of maps for rendering', () => {
    const maps = layers.maps;

    expect(Array.isArray(maps)).toBe(true);
  });

  it('should return an array of resource objects', () => {
    const resources = layers.resources;

    expect(Array.isArray(resources)).toBe(true);
  });

  it('should return an array of coordinates to initialize enemies', () => {
    const enemies = layers.enemies;

    expect(Array.isArray(enemies)).toBe(true);
  });
});
