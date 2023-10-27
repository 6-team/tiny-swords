import { EnemiesLayer } from './enemies-layer';
import { LevelType } from '@core/level';
import { Layer } from '@core/layer';

describe('EnemiesLayer', () => {
  it('should create an EnemiesLayer instance filled with enemies conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const level = LevelType.Stones;
    const startCoords: [number, number] = [0, 0];
    const endCoords: [number, number] = [9, 9];
    const layers = [new Layer(10, 10)];

    const enemiesLayer = new EnemiesLayer(gridX, gridY, level, startCoords, endCoords, layers);

    expect(enemiesLayer).toBeInstanceOf(Layer);
  });
});
