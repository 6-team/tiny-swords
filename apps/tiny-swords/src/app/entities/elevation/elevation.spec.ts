import { ElevationSprite } from './elevation';
import { ElevationType } from './elevation.const';

describe('ElevationSprite testing', () => {
  let elevationSprite: ElevationSprite;

  beforeEach(() => {
    elevationSprite = new ElevationSprite();
  });

  it('should create an instance', () => {
    expect(elevationSprite).toBeInstanceOf(ElevationSprite);
  });

  it('should set elevation type to MIDDLE_MIDDLE by default', () => {
    expect((elevationSprite as any)._type).toBe(ElevationType.MIDDLE_MIDDLE);
  });

  it('should change elevation type when setType is called', () => {
    elevationSprite.setType(ElevationType.BOTTOM_RIGHT);
    expect((elevationSprite as any)._type).toBe(ElevationType.BOTTOM_RIGHT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (elevationSprite as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([
      ElevationType.TOP_LEFT,
      ElevationType.TOP_MIDDLE,
      ElevationType.TOP_RIGHT,
      ElevationType.MIDDLE_LEFT,
      ElevationType.MIDDLE_MIDDLE,
      ElevationType.MIDDLE_MIDDLE,
    ]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
