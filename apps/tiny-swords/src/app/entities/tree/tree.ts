import { Tile } from '@entities/tile';
import { TreeType, mapTerrainToCoords } from './tree.const';

/**
 * Represents a TreeTile, a specific type of Tile with tree-related information.
 */
export class TreeTile extends Tile<TreeType> {
  /**
   * The type of the tree tile.
   * @type {TreeType}
   */
  protected _type: TreeType;

  /**
   * The sprite URL for the tree tile.
   * @type {string}
   */
  protected _sprite = './img/Resources/Tree/Tree.png';

  /**
   * Creates a new TreeTile instance.
   * @param {TreeType} type - The type of the tree tile (default: TreeType.STRUMP).
   */
  constructor(type: TreeType = TreeType.STRUMP) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the tree tile.
   * @param {TreeType} type - The type of the tree tile to set (default: TreeType.STRUMP).
   * @returns {void}
   */
  setType(type: TreeType = TreeType.STRUMP): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the tree tile.
   * @returns {object} A mapping of tree types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
