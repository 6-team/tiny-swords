import { GroundLayer } from './ground-layer';
import { Layer } from '@core/layer';

describe('GroundLayer', () => {
  it('should create a GroundLayer instance filled with ground and terrain features', () => {
    const gridX = 30;
    const gridY = 30;
    const border = 2;
    const startCoords: [number, number] = [10, 10];
    const endCoords: [number, number] = [9, 9];

    const groundLayer = new GroundLayer(gridX, gridY, border, startCoords, endCoords);

    expect(groundLayer).toBeInstanceOf(Layer);
  });
});
