import { SheepSprite } from './sheep';
import { SheepType } from './sheep.const';

describe('SheepSprite', () => {
  let sheepSprite: SheepSprite;

  beforeEach(() => {
    sheepSprite = new SheepSprite();
  });

  it('should create an instance of SheepSprite', () => {
    expect(sheepSprite).toBeInstanceOf(SheepSprite);
  });

  it('should have a default type of SheepType.SHEEP_RIGHT', () => {
    expect(sheepSprite.type).toBe(SheepType.SHEEP_RIGHT);
  });

  describe('setType', () => {
    it('should set the type of the sheep', () => {
      sheepSprite.setType(SheepType.SHEEP_LEFT);

      expect(sheepSprite.type).toBe(SheepType.SHEEP_LEFT);
    });
  });
});
