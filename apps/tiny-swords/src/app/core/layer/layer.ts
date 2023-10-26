import { Matrix } from "@tools/matrix/matrix";
import { TileName } from "@core/renderer";
import { randomElement, weightedRandomElement } from "../layers";
import { LayerCell, LayerCondition, LayerRules, TileWeight } from "./layer.types";

/**
 * Represents a class for creating a layer for static rendering and filling it with tiles
 */
export class Layer {
  /**
   * Matrix of a layer with cells
   * 
   * @type {Matrix<LayerCell>}
   */
  private _layer;

  /**
   * The size of the layer matrix by width
   * 
   * @type {number}
   */
  private _gridX: number;

  /**
   * The size of the layer matrix in height
   * 
   * @type {number}
   */
  private _gridY: number;

  /**
   * Creating a layer matrix
   * 
   * @param {number} gridX
   * @param {number} gridY
   */
	constructor(gridX: number, gridY: number) {
		this._gridX = gridX;
    this._gridY = gridY;

    this._layer = new Matrix<LayerCell>(gridX, gridY);

    for (let i = 0; i < this._layer.array.length; i++) {
      const x = i % this._gridX;
      const y = Math.floor(i / this._gridX);

      this._layer.set({ x, y }, {
        collapsed: false,
        coords: [x, y],
        options: [],
        boundary: false,
      });
    }
  }

  /**
   * Getting a layer as an array
   * 
   * @type {Array<LayerCell>}
   */
  get array() {
    return this._layer.array;
  }

  /**
   * Fills the layer with specified conditions.
   * 
   * @param {LayerCondition[][]} conditionsList - Array of conditions list
   * @returns {Layer} - The current Layer instance
   */
  fill(conditionsList: LayerCondition[][]): Layer {
    conditionsList.forEach((conditions: LayerCondition[]) => {
      conditions.forEach(({ tile, coords, boundary }) => {
        this._setLayerCell({ coords, boundary, options: [tile], collapsed: true });
      });
    });

    return this;
  }

  /**
   * Fills the layer using the "Collapse of the wave function" algorithm.
   * 
   * @param {LayerRules} rules - Array of rules
   * @param {TileWeight[]} tileOptions - Array of weighted tiles
   * @returns {Layer} - The current Layer instance
   */
  wfc(rules: LayerRules, tileOptions: TileWeight[]): Layer {
    const tileTypes: TileName[] = tileOptions.map(([tile]) => tile);

    this._initializeNonCollapsedCells(tileTypes);
    this._collapseCellOptions(rules, tileTypes);

    const initLayer = this._cloneLayerMatrix();
    let j = 0;

    while (j < 10e6) {
      const cell = this._defineCellToUpdate();
      this._setRandomTileByIndex(cell, tileOptions);

      try {
        this._collapseCellOptions(rules, tileTypes);
      } catch (e) {
        console.log('Generation error, iterations: ', j);
        this._layer = initLayer;
      }

      if (this._allCellsCollapsed()) {
        break;
      }

      j++;
    }

    return this;
  }

  /**
   * Checks if all cells in the layer are collapsed.
   * 
   * @returns {boolean} - True if all cells are collapsed, false otherwise
   */
  private _allCellsCollapsed(): boolean {
    return this._layer.array.every(({ collapsed }) => collapsed);
  }

  /**
   * Initializes non-collapsed cells with the available tile options.
   * 
   * @param {TileName[]} tileTypes - Array of available tile types
   */
  private _initializeNonCollapsedCells(tileTypes: TileName[]) {
    this._layer.array.forEach(({ coords, collapsed }) => {
      if (!collapsed) {
        this._setLayerCell({
          coords,
          collapsed: false,
          options: [...tileTypes],
          boundary: false
        });
      }
    });
  }

  /**
   * Updates cell entropy based on rules and available tile types.
   * 
   * @param {LayerRules} rules - Array of rules
   * @param {TileName[]} tileTypes - Array of available tile types
   */
  private _collapseCellOptions(rules: LayerRules, tileTypes: TileName[]) {
    const nextGrid = new Matrix<LayerCell>(this._gridX, this._gridY);

    this._layer.array.forEach((cell) => {
      const { coords } = cell;
      const [x, y] = coords;

      if (cell.collapsed) {
        nextGrid.set({ x, y }, cell);
      } else {
        let options = [...tileTypes];

        if (y > 0) {
          const up = this._layer.get({ x, y: y - 1 });
          options = this._updateOptionsBasedOnRule(options, up.options, rules, 2);
        }

        if (x < this._gridX - 1) {
          const right = this._layer.get({ x: x + 1, y });
          options = this._updateOptionsBasedOnRule(options, right.options, rules, 3);
        }

        if (y < this._gridY - 1) {
          const down = this._layer.get({ x, y: y + 1 });
          options = this._updateOptionsBasedOnRule(options, down.options, rules, 0);
        }

        if (x > 0) {
          const left = this._layer.get({ x: x - 1, y });
          options = this._updateOptionsBasedOnRule(options, left.options, rules, 1);
        }

        nextGrid.set({ x, y }, {
          collapsed: false,
          coords: [x, y],
          options,
          boundary: false,
        });
      }
    });

    this._layer = nextGrid;
  }

  /**
   * Updates the available options based on a rule.
   * 
   * @param {TileName[]} options - Current available options
   * @param {TileName[]} neighborOptions - Options from neighboring cells
   * @param {LayerRules} rules - Array of rules
   * @param {number} direction - Direction of the neighbor cell
   * @returns {TileName[]} - Updated available options
   */
  private _updateOptionsBasedOnRule(options: TileName[], neighborOptions: TileName[], rules: LayerRules, direction: number) {
    const validOptions = neighborOptions.flatMap(option => rules[option][direction]);

    return this._checkValid(options, validOptions);
  }

  /**
   * Sets the properties of a LayerCell in the layer.
   * 
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {boolean} collapsed - Whether the cell is collapsed
   * @param {TileName[]} options - Array of available tile options
   * @param {boolean} boundary - Whether the cell is on the boundary
   */
  private _setLayerCell(cell: LayerCell) {
    const [x, y] = cell.coords;

    this._layer.set({ x, y }, cell);
  }

  /**
   * Set a random tile using weight
   * 
   * @param {LayerCell} cell - layer cell
   * @param {TileWeight[]} tileTypes - Array of weighed tiles
   */
  private _setRandomTileByIndex({ coords, options }: LayerCell, tileOptions: TileWeight[]) {
    const optionsWeight = tileOptions.filter(([tile]) => options.includes(tile));
    let tileName = null;
    
    if (optionsWeight.length) {
      tileName = weightedRandomElement(optionsWeight);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, __, boundary] = optionsWeight.find(([tile]) => tileName === tile);

      this._setLayerCell({
        coords,
        collapsed: true,
        options: [tileName],
        boundary,
      });
    } else {
      this._setLayerCell({
        coords,
        collapsed: true,
        options: [tileName],
        boundary: false,
      });
    }
  }

  /**
   * Selecting a random cell for collapse by the minimum possible tiles
   * 
   * @returns {LayerCell} - Layer cell
   */
  private _defineCellToUpdate(): LayerCell {
    let gridCopy = this._layer.array.slice();

    gridCopy = gridCopy.filter((el: LayerCell) => !el.collapsed);

    gridCopy.sort((a: LayerCell, b: LayerCell) => {
      return a.options.length - b.options.length;
    });

    const len = gridCopy[0].options.length;

    let stopIndex = 0;
    for (let i = 1; i < gridCopy.length; i++) {
      if (gridCopy[i].options.length > len) {
        stopIndex = i;
        break;
      }
    }

    if (stopIndex > 0) gridCopy.splice(stopIndex);

    return randomElement(gridCopy);
  }

  /**
   * Narrowing the list of possible tiles
   * 
   * @param {TileName[]} options - List of all cell tiles
   * @param {TileName[]} valid - List of valid tiles
   * @returns {TileName[]} - List of filtered tiles
   */
  private _checkValid(options: TileName[], valid: TileName[]) {  
    const filteredOption = options.filter((option: number) => {
      return valid.includes(option);
    });

    return filteredOption;
  }

  /**
   * Clones the current layer's matrix.
   * 
   * @returns {Matrix<LayerCell>} - A deep copy of the current matrix
   */
  private _cloneLayerMatrix(): Matrix<LayerCell> {
    const clonedMatrix = new Matrix<LayerCell>(this._gridX, this._gridY);
    
    for (let x = 0; x < this._gridX; x++) {
      for (let y = 0; y < this._gridY; y++) {
        const cell = this._layer.get({ x, y });
        clonedMatrix.set({ x, y }, { ...cell });
      }
    }
    
    return clonedMatrix;
  }
}