import { WaterTile } from './water';
import { WaterType } from './water.const';

describe('WaterTile', () => {
  let waterTile: WaterTile;

  beforeEach(() => {
    waterTile = new WaterTile();
  });

  it('should create an instance of WaterTile', () => {
    expect(waterTile).toBeInstanceOf(WaterTile);
  });

  describe('setType', () => {
    it('should set the type of the sheep', () => {
      waterTile.setType(WaterType.MIDDLE_MIDDLE);

      expect(waterTile.type).toBe(WaterType.MIDDLE_MIDDLE);
    });
  });
});
