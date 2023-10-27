import { ElevationLayer } from './elevation-layer';
import { LevelType } from '@core/level';
import { Layer } from '@core/layer';

describe('ElevationLayer', () => {
  it('should create an ElevationLayer instance filled with elevation conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const level = LevelType.Stones;
    const layer = new Layer(gridX, gridY);

    const elevationLayer = new ElevationLayer(gridX, gridY, level, layer);

    expect(elevationLayer).toBeInstanceOf(Layer);
  });
});
