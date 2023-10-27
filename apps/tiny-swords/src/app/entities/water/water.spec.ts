import { WaterSprite } from './water';
import { WaterType } from './water.const';

describe('WaterSprite', () => {
  let waterSprite: WaterSprite;

  beforeEach(() => {
    waterSprite = new WaterSprite();
  });

  it('should create an instance of WaterSprite', () => {
    expect(waterSprite).toBeInstanceOf(WaterSprite);
  });

  describe('setType', () => {
    it('should set the type of the sheep', () => {
      waterSprite.setType(WaterType.MIDDLE_MIDDLE);

      expect(waterSprite.type).toBe(WaterType.MIDDLE_MIDDLE);
    });
  });
});
