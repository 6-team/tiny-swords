import { GoldMineType } from './gold-mine.const';
import { GoldMineTile } from './gold-mine';

describe('GoldMineTile testing', () => {
  let goldMine: GoldMineTile;

  beforeEach(() => {
    goldMine = new GoldMineTile();
  });

  it('should create an instance', () => {
    expect(goldMine).toBeInstanceOf(GoldMineTile);
  });

  it('should set gold mine type to TOP_LEFT by default', () => {
    expect((goldMine as any)._type).toBe(GoldMineType.TOP_LEFT);
  });

  it('should change gold mine type when setType is called', () => {
    goldMine.setType(GoldMineType.BOTTOM_LEFT);
    expect((goldMine as any)._type).toBe(GoldMineType.BOTTOM_LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (goldMine as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([
      GoldMineType.BOTTOM_LEFT,
      GoldMineType.BOTTOM_RIGHT,
      GoldMineType.BOTTOM_MIDDLE,
      GoldMineType.TOP_LEFT,
      GoldMineType.TOP_RIGHT,
      GoldMineType.TOP_MIDDLE,
    ]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
