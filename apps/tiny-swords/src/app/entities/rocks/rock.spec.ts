import { RocksTile, RocksType, mapTerrainToCoords } from './index';

describe('RocksTile', () => {
  let tile: any;

  beforeEach(() => {
    tile = new RocksTile();
  });

  it('should create an instance of RocksTile', () => {
    expect(tile).toBeInstanceOf(RocksTile);
  });

  it('should initialize with type ROCKS_M by default', () => {
    expect(tile._type).toEqual(RocksType.ROCKS_M);
  });

  it('should set type correctly', () => {
    tile.setType(RocksType.ROCKS_L);
    expect(tile._type).toEqual(RocksType.ROCKS_L);
  });

  it('should have the correct sprite url', () => {
    expect(tile._sprite).toEqual('./img/Terrain/Water/Rocks/Rocks_02.png');
  });

  it('should have correct coords map', () => {
    expect(tile._getCoordsMap()).toMatchObject(mapTerrainToCoords);
  });
});
