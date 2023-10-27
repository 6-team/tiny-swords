import { Layer } from './layer';
import { Matrix } from '@tools/matrix';

describe('Layer class functions', () => {
  let layer: any;

  beforeEach(() => {
    layer = new Layer(3, 3);
  });

  it('constructor function should instantiate _gridX, _gridY properties and initializes _layer Matrix with correct defaults', () => {
    expect(layer._gridX).toEqual(3);
    expect(layer._gridY).toEqual(3);
    expect(layer._layer).toBeInstanceOf(Matrix);
    expect(layer._layer.array).toHaveLength(9);
    layer._layer.array.forEach((cell) => {
      expect(cell.collapsed).toBe(false);
      expect(cell.boundary).toBe(false);
      expect(cell.coords).toHaveLength(2);
      expect(cell.options).toEqual([]);
    });
  });

  it('array getter should return _layer as array', () => {
    const array = layer.array;
    expect(array).toBeInstanceOf(Array);
    expect(array).toEqual(layer._layer.array);
  });

  it('fill(conditionsList) methods updates Layer cells accordingly', () => {
    layer.fill([
      [
        { sprite: 'sprite1', coords: [0, 0], boundary: true },
        { sprite: 'sprite2', coords: [1, 1], boundary: true },
      ],
    ]);

    expect(layer._layer.get({ x: 0, y: 0 })).toEqual({
      collapsed: true,
      coords: [0, 0],
      options: ['sprite1'],
      boundary: true,
    });

    expect(layer._layer.get({ x: 1, y: 1 })).toEqual({
      collapsed: true,
      coords: [1, 1],
      options: ['sprite2'],
      boundary: true,
    });
  });

  it('_allCellsCollapsed() should return true if all cells are collapsed, false otherwise', () => {
    expect(layer._allCellsCollapsed()).toBe(false);

    // Let's collapse all the cells manually and then check _allCellsCollapsed()
    layer._layer.array.forEach((cell) => (cell.collapsed = true));
    expect(layer._allCellsCollapsed()).toBe(true);
  });

  it('_initializeNonCollapsedCells(spriteTypes) initializes non-collapsed cells with provided spriteTypes', () => {
    const spriteTypes = ['sprite1', 'sprite2'];
    layer._initializeNonCollapsedCells(spriteTypes);
    layer._layer.array.forEach((cell) => {
      if (!cell.collapsed) {
        expect(cell.options).toEqual(spriteTypes);
      }
    });
  });

  it('_setLayerCell(cell) updates the desired cell in the layer', () => {
    const cellData = { collapsed: false, coords: [0, 1], options: ['sprite1'], boundary: true };
    layer._setLayerCell(cellData);
    expect(layer._layer.get({ x: 0, y: 1 })).toEqual(cellData);
  });

  it('_setRandomSpriteByIndex(cell, spriteTypes) sets a random sprite by index', () => {
    const cellData = { collapsed: false, coords: [0, 0], options: ['sprite1', 'sprite2'] };
    const spriteTypes = [
      ['sprite1', 1, true],
      ['sprite2', 1, false],
    ];

    for (let i = 0; i < 10; i++) {
      // Run multiple times to take randomness into account
      layer._setRandomSpriteByIndex(cellData, spriteTypes);
      const resultCell = layer._layer.get({ x: 0, y: 0 });
      expect(['sprite1', 'sprite2']).toContain(resultCell.options[0]);
      expect(resultCell.collapsed).toBe(true);
    }
  });

  it('_checkValid(options, valid) returns a filtered list of options that are valid', () => {
    const options = ['sprite1', 'sprite2', 'sprite3'];
    const valid = ['sprite2', 'sprite3'];
    const result = layer._checkValid(options, valid);
    expect(result).toEqual(valid);
  });

  it("_cloneLayerMatrix() should return an exact deep copy of current layer's matrix", () => {
    const clonedMatrix = layer._cloneLayerMatrix();
    expect(clonedMatrix).toBeInstanceOf(Matrix);
    expect(clonedMatrix).not.toBe(layer._layer);
    expect(clonedMatrix.array).toEqual(layer._layer.array);
  });

  it('_collapseCellOptions(rules, spriteTypes) modifies layer based on rules and sprite types', () => {
    layer.fill([
      [
        { sprite: 'sprite1', coords: [0, 2], boundary: false },
        { sprite: 'sprite2', coords: [1, 1], boundary: false },
      ],
    ]);

    const rules = {
      sprite1: [['sprite2'], [], [], []],
      sprite2: [[], [], ['sprite1'], []],
    };

    const spriteTypes = ['sprite1', 'sprite2'];

    layer._collapseCellOptions(rules, spriteTypes);

    const updatedCell = layer._layer.get({ x: 1, y: 2 });
    expect(updatedCell.options).not.toContain('sprite2');
  });
});
