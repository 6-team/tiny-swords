import { TowerSprite } from './tower';
import { TowerType } from './tower.const';

describe('TowerSprite', () => {
  it('should create a TowerSprite with the default type', () => {
    const towerSprite = new TowerSprite();

    expect(towerSprite.type).toBe(TowerType.TOP_LEFT);
  });

  it('should create a TowerSprite with the specified type', () => {
    const towerSprite = new TowerSprite(TowerType.BOTTOM_RIGHT);

    expect(towerSprite.type).toBe(TowerType.BOTTOM_RIGHT);
  });

  it('should set the type of the TowerSprite', () => {
    const towerSprite = new TowerSprite();

    towerSprite.setType(TowerType.MIDDLE_LEFT);

    expect(towerSprite.type).toBe(TowerType.MIDDLE_LEFT);
  });
});
