import { ShadowLayer } from './shadow-layer';
import { Layer } from '@core/layer';

describe('ShadowLayer', () => {
  it('should create a ShadowLayer instance with shadow conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const level = 2;
    const baseLayer = new Layer(gridX, gridY);

    const shadowLayer = new ShadowLayer(gridX, gridY, level, baseLayer);

    expect(shadowLayer).toBeInstanceOf(Layer);
  });
});
