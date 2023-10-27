import { TreeSprite } from './tree';
import { TreeType } from './tree.const';

describe('TreeSprite', () => {
  it('should create a TreeSprite with the default type', () => {
    const towerSprite = new TreeSprite();

    expect(towerSprite.type).toBe(TreeType.STRUMP);
  });

  it('should create a TreeSprite with the specified type', () => {
    const towerSprite = new TreeSprite(TreeType.BOTTOM_RIGHT);

    expect(towerSprite.type).toBe(TreeType.BOTTOM_RIGHT);
  });

  it('should set the type of the TreeSprite', () => {
    const towerSprite = new TreeSprite();

    towerSprite.setType(TreeType.MIDDLE_LEFT);

    expect(towerSprite.type).toBe(TreeType.MIDDLE_LEFT);
  });
});
