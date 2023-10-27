import {
  goldMineConditions,
  leftHouseConditions,
  rightHouseConditions,
  treeBottomConditions,
} from './buldings-conditions';
import { SpriteName } from '@core/renderer';

describe('test conditions', () => {
  it('leftHouseConditions should return an array of LayerCondition objects', () => {
    const enter: [number, number] = [3, 4];
    const result = leftHouseConditions(enter);

    expect(Array.isArray(result)).toBe(true);

    result.forEach((condition) => {
      expect(condition).toHaveProperty('sprite');
      expect(condition).toHaveProperty('coords');
      expect(condition).toHaveProperty('boundary');

      expect(typeof condition.sprite).toBe('number');
      expect(Array.isArray(condition.coords)).toBe(true);
      expect(condition.coords.length).toBe(2);
      expect(typeof condition.boundary).toBe('boolean');
    });
  });

  it('rightHouseConditions returns an array of LayerCondition objects for a given exit', () => {
    const exit: [number, number] = [2, 3];
    const conditions = rightHouseConditions(exit);

    expect(conditions).toEqual([
      { sprite: SpriteName.HOUSE_BOTTOM_LEFT, coords: [2, 2], boundary: true },
      { sprite: SpriteName.HOUSE_BOTTOM_RIGHT, coords: [3, 2], boundary: true },
      { sprite: SpriteName.HOUSE_MIDDLE_LEFT, coords: [2, 1], boundary: true },
      { sprite: SpriteName.HOUSE_MIDDLE_RIGHT, coords: [3, 1], boundary: true },
    ]);
  });

  it('treeBottomConditions should return an array of LayerCondition objects', () => {
    const layer = {
      array: [
        { coords: [0, 0], options: [SpriteName.TREE_STRUMP] },
        { coords: [0, 1], options: [SpriteName.TREE_TOP_MIDDLE] },
      ],
    };

    const expected = [
      { sprite: SpriteName.TREE_BOTTOM_LEFT, coords: [-1, 0] },
      { sprite: SpriteName.TREE_BOTTOM_MIDDLE, coords: [0, 0] },
      { sprite: SpriteName.TREE_BOTTOM_RIGHT, coords: [1, 0] },
    ];

    const result = treeBottomConditions(layer);

    expect(result).toEqual(expected);
  });

  it('goldMineConditions should return an array of LayerCondition objects', () => {
    const expected = [
      { sprite: SpriteName.GOLDMINE_BOTTOM_LEFT, coords: [9, 9], boundary: true },
      { sprite: SpriteName.GOLDMINE_BOTTOM_MIDDLE, coords: [10, 9], boundary: true },
      { sprite: SpriteName.GOLDMINE_BOTTOM_RIGHT, coords: [11, 9], boundary: true },
      { sprite: SpriteName.GOLDMINE_TOP_LEFT, coords: [9, 8], boundary: true },
      { sprite: SpriteName.GOLDMINE_TOP_MIDDLE, coords: [10, 8], boundary: true },
      { sprite: SpriteName.GOLDMINE_TOP_RIGHT, coords: [11, 8], boundary: true },
    ];

    const result = goldMineConditions([10, 10]);

    expect(result).toEqual(expected);
  });
});
