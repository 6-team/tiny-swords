import { SandTile, SandType, mapTerrainToCoords } from './';

describe('SandTile', () => {
  let tile: any;

  beforeEach(() => {
    tile = new SandTile();
  });

  it('should create an instance of SandTile', () => {
    expect(tile).toBeInstanceOf(SandTile);
  });

  it('should initialize with type MIDDLE_MIDDLE by default', () => {
    expect(tile._type).toEqual(SandType.MIDDLE_MIDDLE);
  });

  it('should set type correctly', () => {
    tile.setType(SandType.TOP_LEFT);
    expect(tile._type).toEqual(SandType.TOP_LEFT);
  });

  it('should have the correct sprite url', () => {
    expect(tile._sprite).toEqual('./img/Terrain/Ground/Tilemap_Flat.png');
  });

  it('should have correct coords map', () => {
    expect(tile._getCoordsMap()).toMatchObject(mapTerrainToCoords);
  });
});
