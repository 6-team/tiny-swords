import { DecoLayer } from './decorations-layer';
import { LevelType } from '@core/level';
import { Layer } from '@core/layer';

describe('DecoLayer', () => {
  it('should create a decoration layer with elements for a specific level', () => {
    const gridX = 10;
    const gridY = 10;
    const level = LevelType.Ground;
    const layers = [new Layer(gridX, gridY), new Layer(gridX, gridY)];

    const decoLayer = new DecoLayer(gridX, gridY, level, layers);

    expect(decoLayer).toBeInstanceOf(Layer);
  });
});
