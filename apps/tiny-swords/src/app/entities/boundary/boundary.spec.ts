import { BoundaryType } from './boundary.const';
import { BoundaryTile } from './boundary';

describe('BoundaryTile testing', () => {
  let boundaryTile: BoundaryTile;

  beforeEach(() => {
    boundaryTile = new BoundaryTile();
  });

  it('should create an instance', () => {
    expect(boundaryTile).toBeInstanceOf(BoundaryTile);
  });

  it('should set boundary type to MIDDLE by default', () => {
    expect((boundaryTile as any)._type).toBe(BoundaryType.MIDDLE);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (boundaryTile as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([BoundaryType.MIDDLE]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
