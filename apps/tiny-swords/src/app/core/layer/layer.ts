import { Matrix } from "../../tools/matrix/matrix";
import { TileName } from "../renderer";
import { randomElement, weightedRandomElement } from "../layers/layers.utils";
import { LayerCell, LayerCondition, LayerRules, TileWight } from "./layer.types";

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
   * Filling in a layer by an array of conditions list
   * 
   * @param {LayerCondition[][]} conditionsList - Array of conditions list
   */
  fill(conditionsList: LayerCondition[][]) {
    conditionsList.forEach((conditions: LayerCondition[]) => {
      conditions.forEach(({ tile, coords, boundary }) => {
        this._layer.set({ x: coords[0], y: coords[1] }, {
          collapsed: true,
          coords,
          options: [tile],
          boundary,
        });
      });
    });

    return this; 
  }

  /**
   * Filling the layer with the "Collapse of the wave function" algorithm
   * 
   * @param {LayerRules} rules - Array of rules
   * @param {TileWight[]} tileOptions - Array of wighted tiles
   */
  wfc(rules: LayerRules, tileOptions: TileWight[]) {
    const tileTypes: TileName[] = tileOptions.reduce((acc, [tile]) => [...acc, tile], []);

    this._layer.array.forEach(({ coords, collapsed }) => {
      if (!collapsed) {
        const [x, y] = coords;

        this._layer.set({ x, y }, {
          collapsed: false,
          coords,
          options: [...tileTypes],
          boundary: false,
        });
      }
    });

    this._collapseCellOptions(rules, tileTypes);

    const initLayer = this._layer;

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

      if (this._layer.array.every(({ collapsed }) => collapsed)) {
        break;
      }

      j++;
    }

    return this;
  }

  /**
   * Entropy update
   * 
   * @param {LayerRules} rules - Array of rules
   * @param {TileName[]} tileTypes - Array of tiles
   */
  _collapseCellOptions(rules: LayerRules, tileTypes: TileName[]) {
    const nextGrid = new Matrix<LayerCell>(this._gridX, this._gridY);

    for (let index = 0; index < this._layer.array.length; index++) {
      const cell = this._layer.array[index];
      let options = [...tileTypes];

      const { coords } = cell;
      const [x, y] = coords;

      if (cell.collapsed) {
        nextGrid.set({ x, y }, cell);
      } else {
        if (y > 0) {
          const up = this._layer.get({ x, y: y - 1 });            
          let validOptions = [];

          for (const option of up.options) {
            const valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }

          options = this._checkValid(options, validOptions);
        }

        if (x < this._gridX - 1) {
          const right = this._layer.get({ x: x + 1, y });
          let validOptions = [];

          for (const option of right.options) {
            const valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          options = this._checkValid(options, validOptions);
        }

        if (y < this._gridY - 1) {
          const down = this._layer.get({ x, y: y + 1 });
          let validOptions = [];

          for (const option of down.options) {
            const valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          options = this._checkValid(options, validOptions);
        }

        if (x > 0) {
          const left = this._layer.get({ x: x - 1, y });
          let validOptions = [];

          for (const option of left.options) {
            const valid = rules[option][1];
            validOptions = validOptions.concat(valid);
          }
          options = this._checkValid(options, validOptions);
        }

        nextGrid.set({ x, y }, {
          collapsed: false,
          coords: [x, y],
          options,
          boundary: false,
        });
      }
    };

    this._layer = nextGrid;
  }

  /**
   * Set a random tile using weight
   * 
   * @param {LayerCell} cell - layer cell
   * @param {TileWight[]} tileTypes - Array of weighed tiles
   */
  _setRandomTileByIndex({ coords, options }: LayerCell, tileOptions: TileWight[]) {
    const optionsWeight = tileOptions.filter(([tile]) => options.includes(tile));
    let tileName = null;
    
    if (optionsWeight.length) {
      tileName = weightedRandomElement(optionsWeight);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, __, boundary] = optionsWeight.find(([tile]) => tileName === tile);

      this._layer.set({ x: coords[0], y: coords[1] }, {
        coords,
        collapsed: true,
        options: [tileName],
        boundary,
      });
    } else {
      this._layer.set({ x: coords[0], y: coords[1] }, {
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
  _defineCellToUpdate(): LayerCell {
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
  _checkValid(options: TileName[], valid: TileName[]) {  
    const filteredOption = options.filter((option: number) => {
      return valid.includes(option);
    });

    return filteredOption;
  }
}