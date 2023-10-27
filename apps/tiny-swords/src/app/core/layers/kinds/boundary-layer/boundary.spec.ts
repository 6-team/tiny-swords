import { boundaryConditions } from './boundary-conditions';
import { TileName } from '@core/renderer';
import { BoundaryLayer } from '@core/layers/kinds/boundary-layer/boundary-layer';
import { Layer } from '@core/layer';

describe('boundaryConditions', () => {
  it('should return an array of layer conditions representing boundary conditions', () => {
    const layers: any = [
      {
        array: [
          { coords: [0, 0], boundary: true },
          { coords: [1, 1], boundary: false },
          { coords: [2, 2], boundary: true },
        ],
      },
      {
        array: [
          { coords: [3, 3], boundary: true },
          { coords: [4, 4], boundary: true },
        ],
      },
    ];

    const result = boundaryConditions(layers);

    expect(result).toEqual([
      { tile: TileName.BOUNDARY, coords: [0, 0] },
      { tile: TileName.BOUNDARY, coords: [2, 2] },
      { tile: TileName.BOUNDARY, coords: [3, 3] },
      { tile: TileName.BOUNDARY, coords: [4, 4] },
    ]);
  });
});

describe('BoundaryLayer', () => {
  it('should construct a new boundary layer with correct boundary conditions', () => {
    // Arrange
    const gridX = 10;
    const gridY = 10;
    const layers: any = [
      {
        array: [
          { coords: [0, 0], boundary: true },
          { coords: [1, 1], boundary: false },
          { coords: [2, 2], boundary: true },
        ],
      },
      {
        array: [
          { coords: [3, 3], boundary: true },
          { coords: [4, 4], boundary: true },
        ],
      },
    ];

    // Act
    const boundaryLayer = new BoundaryLayer(gridX, gridY, layers);

    // Assert
    expect(boundaryLayer).toBeInstanceOf(Layer);
    // Add more assertions to verify the correctness of the boundary layer
  });
});
