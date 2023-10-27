import { BoundaryType } from './boundary.const';
import { BoundarySprite } from './boundary';

describe('BoundarySprite testing', () => {
  let boundarySprite: BoundarySprite;

  beforeEach(() => {
    boundarySprite = new BoundarySprite();
  });

  it('should create an instance', () => {
    expect(boundarySprite).toBeInstanceOf(BoundarySprite);
  });

  it('should set boundary type to MIDDLE by default', () => {
    expect((boundarySprite as any)._type).toBe(BoundaryType.MIDDLE);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (boundarySprite as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([BoundaryType.MIDDLE]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
