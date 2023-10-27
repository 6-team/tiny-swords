import { SignLayer } from './sign-layer';
import { Layer } from '@core/layer';

describe('SignLayer', () => {
  it('should create a SignLayer instance with sign conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const startCoords = { x: 2, y: 2 };
    const endCoords = { x: 8, y: 8 };

    const signLayer = new SignLayer(gridX, gridY, startCoords, endCoords);

    expect(signLayer).toBeInstanceOf(Layer);
  });
});
