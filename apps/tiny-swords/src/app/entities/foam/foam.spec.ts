import { FoamType } from './foam.const';
import { FoamSprite } from './foam';

describe('FoamSprite testing', () => {
  let foamSprite: FoamSprite;

  beforeEach(() => {
    foamSprite = new FoamSprite();
  });

  it('should create an instance', () => {
    expect(foamSprite).toBeInstanceOf(FoamSprite);
  });

  it('should set foam type to MIDDLE by default', () => {
    expect((foamSprite as any)._type).toBe(FoamType.MIDDLE);
  });

  it('should change foam type when setType is called', () => {
    foamSprite.setType(FoamType.TOP);
    expect((foamSprite as any)._type).toBe(FoamType.TOP);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (foamSprite as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([FoamType.LEFT, FoamType.MIDDLE, FoamType.BOTTOM, FoamType.RIGHT, FoamType.TOP]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
