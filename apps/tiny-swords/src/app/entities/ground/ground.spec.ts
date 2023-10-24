import { GroundType } from './ground.const';
import { GroundTile } from './ground';

describe('GroundTile testing', () => {
  let groundTile: GroundTile;

  beforeEach(() => {
    groundTile = new GroundTile();
  });

  it('should create an instance', () => {
    expect(groundTile).toBeInstanceOf(GroundTile);
  });

  it('should set ground type to MIDDLE_MIDDLE by default', () => {
    expect((groundTile as any)._type).toBe(GroundType.MIDDLE_MIDDLE);
  });

  it('should change ground type when setType is called', () => {
    groundTile.setType(GroundType.TOP_LEFT);
    expect((groundTile as any)._type).toBe(GroundType.TOP_LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (groundTile as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([
      GroundType.TOP_LEFT,
      GroundType.TOP_MIDDLE,
      GroundType.TOP_RIGHT,
      GroundType.MIDDLE_LEFT,
      GroundType.MIDDLE_MIDDLE,
      GroundType.MIDDLE_RIGHT,
      GroundType.BOTTOM_LEFT,
      GroundType.BOTTOM_MIDDLE,
      GroundType.BOTTOM_RIGHT,

      GroundType.HORIZONTAL_LEFT,
      GroundType.HORIZONTAL_MIDDLE,
      GroundType.HORIZONTAL_RIGHT,

      GroundType.VERTICAL_TOP,
      GroundType.VERTICAL_MIDDLE,
      GroundType.VERTICAL_BOTTOM,
    ]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
