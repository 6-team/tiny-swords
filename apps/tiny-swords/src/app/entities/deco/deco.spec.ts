import { DecoType } from './deco.const';
import { DecoSprite } from './deco';

describe('DecoSprite testing', () => {
  let decoSprite: DecoSprite;

  beforeEach(() => {
    decoSprite = new DecoSprite();
  });

  it('should create an instance', () => {
    expect(decoSprite).toBeInstanceOf(DecoSprite);
  });

  it('should set deco type to MUSHROOM_M by default', () => {
    expect((decoSprite as any)._type).toBe(DecoType.MUSHROOM_M);
  });

  it('should change deco type when setType is called', () => {
    decoSprite.setType(DecoType.BONE_M_LEFT);
    expect((decoSprite as any)._type).toBe(DecoType.BONE_M_LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (decoSprite as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([DecoType.MUSHROOM_S, DecoType.BUSH_S, DecoType.BONE_S_LEFT, DecoType.PUMPKIN_S]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
