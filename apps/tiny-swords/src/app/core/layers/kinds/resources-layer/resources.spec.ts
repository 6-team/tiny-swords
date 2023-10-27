import { ResourcesLayer } from './resurces-layer';
import { Layer } from '@core/layer';
import { LevelType } from '@core/level';

describe('ResourcesLayer', () => {
  it('should create a ResourcesLayer instance filled with resource conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const level = LevelType.Ground;
    const layers = [new Layer(gridX, gridY), new Layer(gridX, gridY)];

    const resourcesLayer = new ResourcesLayer(gridX, gridY, level, layers);

    expect(resourcesLayer).toBeInstanceOf(Layer);
  });
});
