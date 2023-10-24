import { HouseTile, HouseType, mapTerrainToCoords } from './index';

describe('HouseTile', () => {
  let tile: any;

  beforeEach(() => {
    tile = new HouseTile();
  });

  it('should create an instance of HouseTile', () => {
    expect(tile).toBeInstanceOf(HouseTile);
  });

  it('should initialize with type TOP_LEFT by default', () => {
    expect(tile._type).toEqual(HouseType.TOP_LEFT);
  });

  it('should set type correctly', () => {
    tile.setType(HouseType.TOP_RIGHT);
    expect(tile._type).toEqual(HouseType.TOP_RIGHT);
  });

  it('should have the correct sprite url', () => {
    expect(tile._sprite).toEqual('./img/Factions/Knights/Buildings/House/House_Blue.png');
  });

  it('should have correct coords map', () => {
    expect(tile._getCoordsMap()).toMatchObject(mapTerrainToCoords);
  });
});
