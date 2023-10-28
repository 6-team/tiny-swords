import { SandSprite, SandType, mapTerrainToCoords } from './';

describe('SandSprite', () => {
  let sprite: any;

  beforeEach(() => {
    sprite = new SandSprite();
  });

  it('should create an instance of SandSprite', () => {
    expect(sprite).toBeInstanceOf(SandSprite);
  });

  it('should initialize with type MIDDLE_MIDDLE by default', () => {
    expect(sprite._type).toEqual(SandType.MIDDLE_MIDDLE);
  });

  it('should set type correctly', () => {
    sprite.setType(SandType.TOP_LEFT);
    expect(sprite._type).toEqual(SandType.TOP_LEFT);
  });

  it('should have the correct sprite url', () => {
    expect(sprite._sprite).toEqual('./img/Terrain/Ground/Tilemap_Flat.png');
  });

  it('should have correct coords map', () => {
    expect(sprite._getCoordsMap()).toMatchObject(mapTerrainToCoords);
  });
});
