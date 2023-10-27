import { TreeTile } from './tree';
import { TreeType } from './tree.const';

describe('TreeTile', () => {
  it('should create a TreeTile with the default type', () => {
    const towerTile = new TreeTile();

    expect(towerTile.type).toBe(TreeType.STRUMP);
  });

  it('should create a TreeTile with the specified type', () => {
    const towerTile = new TreeTile(TreeType.BOTTOM_RIGHT);

    expect(towerTile.type).toBe(TreeType.BOTTOM_RIGHT);
  });

  it('should set the type of the TreeTile', () => {
    const towerTile = new TreeTile();

    towerTile.setType(TreeType.MIDDLE_LEFT);

    expect(towerTile.type).toBe(TreeType.MIDDLE_LEFT);
  });
});
