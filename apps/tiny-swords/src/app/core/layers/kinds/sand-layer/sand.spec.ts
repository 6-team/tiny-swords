import { SandLayer } from './sand-layer';
import { Layer } from '@core/layer';

describe('SandLayer', () => {
  it('should create a SandLayer instance filled with sand-related conditions', () => {
    const gridX = 15;
    const gridY = 15;
    const border = 1;
    const startCoords: [number, number] = [9, 9];
    const endCoords: [number, number] = [10, 10];

    const sandLayer = new SandLayer(gridX, gridY, border, startCoords, endCoords);

    expect(sandLayer).toBeInstanceOf(Layer);
  });
});
