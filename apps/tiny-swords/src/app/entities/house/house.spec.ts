import { HouseTile, HouseType } from './';

describe('HouseTile', () => {
  let houseTile: HouseTile;

  beforeEach(() => {
    houseTile = new HouseTile();
  });

  it('should create an instance of HouseTile', () => {
    expect(houseTile).toBeInstanceOf(HouseTile);
  });

  it('should initialize with type TOP_LEFT by default', () => {
    expect(houseTile.type).toEqual(HouseType.TOP_LEFT);
  });

  describe('setType', () => {
    it('should set type correctly', () => {
      houseTile.setType(HouseType.TOP_RIGHT);
      expect(houseTile.type).toEqual(HouseType.TOP_RIGHT);
    });
  });
});
