import { WaterLayer } from './water-layer';
import { Layer } from '@core/layer';

describe('WaterLayer', () => {
  it('should create a WaterLayer instance with water-related conditions', () => {
    const gridX = 10;
    const gridY = 10;

    const waterLayer = new WaterLayer(gridX, gridY);

    expect(waterLayer).toBeInstanceOf(Layer);
  });
});
