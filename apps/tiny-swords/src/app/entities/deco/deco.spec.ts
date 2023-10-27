import { DecoType } from './deco.const';
import { DecoTile } from './deco';

describe('DecoTile testing', () => {
  let decoTile: DecoTile;

  beforeEach(() => {
    decoTile = new DecoTile();
  });

  it('should create an instance', () => {
    expect(decoTile).toBeInstanceOf(DecoTile);
  });

  it('should set deco type to MUSHROOM_M by default', () => {
    expect((decoTile as any)._type).toBe(DecoType.MUSHROOM_M);
  });

  it('should change deco type when setType is called', () => {
    decoTile.setType(DecoType.BONE_M_LEFT);
    expect((decoTile as any)._type).toBe(DecoType.BONE_M_LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (decoTile as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([DecoType.MUSHROOM_S, DecoType.BUSH_S, DecoType.BONE_S_LEFT, DecoType.PUMPKIN_S]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
