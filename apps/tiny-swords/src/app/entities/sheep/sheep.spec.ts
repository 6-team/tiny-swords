import { SheepTile } from './sheep';
import { SheepType } from './sheep.const';

describe('SheepTile', () => {
  let sheepTile: SheepTile;

  beforeEach(() => {
    sheepTile = new SheepTile();
  });

  it('should create an instance of SheepTile', () => {
    expect(sheepTile).toBeInstanceOf(SheepTile);
  });

  it('should have a default type of SheepType.SHEEP_RIGHT', () => {
    expect(sheepTile.type).toBe(SheepType.SHEEP_RIGHT);
  });

  describe('setType', () => {
    it('should set the type of the sheep', () => {
      sheepTile.setType(SheepType.SHEEP_LEFT);

      expect(sheepTile.type).toBe(SheepType.SHEEP_LEFT);
    });
  });
});
