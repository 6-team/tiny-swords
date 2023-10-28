import { RocksSprite, RocksType, mapTerrainToCoords } from './';

describe('RocksSprite', () => {
  let sprite: any;

  beforeEach(() => {
    sprite = new RocksSprite();
  });

  it('should create an instance of RocksSprite', () => {
    expect(sprite).toBeInstanceOf(RocksSprite);
  });

  it('should initialize with type ROCKS_M by default', () => {
    expect(sprite._type).toEqual(RocksType.ROCKS_M);
  });

  it('should set type correctly', () => {
    sprite.setType(RocksType.ROCKS_L);
    expect(sprite._type).toEqual(RocksType.ROCKS_L);
  });

  it('should have the correct sprite url', () => {
    expect(sprite._sprite).toEqual('./img/Terrain/Water/Rocks/Rocks_02.png');
  });

  it('should have correct coords map', () => {
    expect(sprite._getCoordsMap()).toMatchObject(mapTerrainToCoords);
  });
});
