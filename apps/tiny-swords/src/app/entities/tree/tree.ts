import { Sprite } from '@entities/sprite';
import { TreeType, mapTerrainToCoords } from './tree.const';

/**
 * Represents a TreeSprite, a specific type of Sprite with tree-related information.
 */
export class TreeSprite extends Sprite<TreeType> {
  /**
   * The type of the tree sprite.
   * @type {TreeType}
   */
  protected _type: TreeType;

  /**
   * The sprite URL for the tree sprite.
   * @type {string}
   */
  protected _sprite = './img/Resources/Tree/Tree.png';

  /**
   * Creates a new TreeSprite instance.
   * @param {TreeType} type - The type of the tree sprite (default: TreeType.STRUMP).
   */
  constructor(type: TreeType = TreeType.STRUMP) {
    super();
    this.setType(type);
  }

  /**
   * Sets the type of the tree sprite.
   * @param {TreeType} type - The type of the tree sprite to set (default: TreeType.STRUMP).
   * @returns {void}
   */
  setType(type: TreeType = TreeType.STRUMP): void {
    this._type = type;
  }

  /**
   * Retrieves the coordinate mapping for the tree sprite.
   * @returns {object} A mapping of tree types to coordinate values.
   */
  protected _getCoordsMap() {
    return mapTerrainToCoords;
  }
}
