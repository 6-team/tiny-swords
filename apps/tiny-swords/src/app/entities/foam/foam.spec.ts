import { FoamType } from './foam.const';
import { FoamTile } from './foam';

describe('FoamTile testing', () => {
  let foamTile: FoamTile;

  beforeEach(() => {
    foamTile = new FoamTile();
  });

  it('should create an instance', () => {
    expect(foamTile).toBeInstanceOf(FoamTile);
  });

  it('should set foam type to MIDDLE by default', () => {
    expect((foamTile as any)._type).toBe(FoamType.MIDDLE);
  });

  it('should change foam type when setType is called', () => {
    foamTile.setType(FoamType.TOP);
    expect((foamTile as any)._type).toBe(FoamType.TOP);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (foamTile as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([FoamType.LEFT, FoamType.MIDDLE, FoamType.BOTTOM, FoamType.RIGHT, FoamType.TOP]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
