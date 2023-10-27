import { StonesLayer } from './stones-layer';
import { Layer } from '@core/layer';

describe('StonesLayer', () => {
  it('should create a StonesLayer instance with stone-related conditions', () => {
    const gridX = 10;
    const gridY = 10;
    const border = 2;
    const startCoords: [number, number] = [2, 2];
    const endCoords: [number, number] = [8, 8];

    const stonesLayer = new StonesLayer(gridX, gridY, border, startCoords, endCoords);

    expect(stonesLayer).toBeInstanceOf(Layer);
  });
});
