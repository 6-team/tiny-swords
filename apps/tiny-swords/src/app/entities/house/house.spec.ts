import { HouseSprite, HouseType } from './';

describe('HouseSprite', () => {
  let houseSprite: HouseSprite;

  beforeEach(() => {
    houseSprite = new HouseSprite();
  });

  it('should create an instance of HouseSprite', () => {
    expect(houseSprite).toBeInstanceOf(HouseSprite);
  });

  it('should initialize with type TOP_LEFT by default', () => {
    expect(houseSprite.type).toEqual(HouseType.TOP_LEFT);
  });

  describe('setType', () => {
    it('should set type correctly', () => {
      houseSprite.setType(HouseType.TOP_RIGHT);
      expect(houseSprite.type).toEqual(HouseType.TOP_RIGHT);
    });
  });
});
