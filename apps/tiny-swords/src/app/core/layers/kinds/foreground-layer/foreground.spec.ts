import { ForegroundLayer } from './foreground-layer';
import { Layer } from '@core/layer';
import { LevelType } from '@core/level';
import { CoordsTuple } from '@entities/tile';

describe('ForegroundLayer', () => {
  it('should create a ForegroundLayer instance filled with foreground conditions', () => {
    const gridX = 30;
    const gridY = 30;
    const level = LevelType.Ground;
    const nextLevel = LevelType.Stones;
    const startCoords: CoordsTuple = [10, 10];
    const endCoords: CoordsTuple = [9, 9];
    const layer = new Layer(10, 10);

    const foregroundLayer = new ForegroundLayer(gridX, gridY, level, nextLevel, startCoords, endCoords, layer);

    expect(foregroundLayer).toBeInstanceOf(Layer);
  });
});
