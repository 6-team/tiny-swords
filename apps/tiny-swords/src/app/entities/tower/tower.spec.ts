import { TowerTile } from './tower';
import { TowerType } from './tower.const';

describe('TowerTile', () => {
  it('should create a TowerTile with the default type', () => {
    const towerTile = new TowerTile();

    expect(towerTile.type).toBe(TowerType.TOP_LEFT);
  });

  it('should create a TowerTile with the specified type', () => {
    const towerTile = new TowerTile(TowerType.BOTTOM_RIGHT);

    expect(towerTile.type).toBe(TowerType.BOTTOM_RIGHT);
  });

  it('should set the type of the TowerTile', () => {
    const towerTile = new TowerTile();

    towerTile.setType(TowerType.MIDDLE_LEFT);

    expect(towerTile.type).toBe(TowerType.MIDDLE_LEFT);
  });
});
