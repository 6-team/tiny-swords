import { CharacterDirection, MovingDirection } from '@shared';
import { ICharacter, TNumberOfPixels } from '@common/common.types';
import { IAbility, TCollisionArea } from '@abilities/abilities.types';
import { Observable } from 'rxjs';

export interface IMovingProps {
  initialX: TNumberOfPixels;
  initialY: TNumberOfPixels;
  height: TNumberOfPixels;
  width?: TNumberOfPixels;
  getCollisionArea?: (movable: IMoving) => TCollisionArea;
}

export type IMovingCharacter = ICharacter<{ moving: IMoving }> & {
  moving: IMoving;
};

export interface IMoving extends IAbility<IMovingCharacter> {
  /**
   * Character Size
   */
  sizes: [height: number, width: number];

  /**
   * Character coordinate stream
   */
  coords: [x: TNumberOfPixels, y: TNumberOfPixels];

  /**
   * Whether the character is currently on the move
   */
  isMoving: boolean;

  /**
   * Is the character turned to the right
   */
  isRightDirection: boolean;

  /**
   * Sets the character's direction while the character is standing still.
   *
   * @param direction Character direction
   * @returns Object of ability
   */
  setCharacterDirection(direction: CharacterDirection): this;

  /**
   * Forcibly sets coordinates to a character
   *
   * @param coords New coordinates
   * @returns Object of ability
   */
  setCoords(coords: [x: TNumberOfPixels, y: TNumberOfPixels]): this;

  /**
   * Starts the character moving in the specified direction
   *
   * @param direction Direction of movement
   * @returns Object of ability
   */
  moveTo(direction: MovingDirection): this;

  /**
   * Starts a character animation for the specified direction
   *
   * @param direction Direction of movement
   * @returns Object of ability
   */
  animate(direction: MovingDirection): this;

  /**
   * Returns the character's zone that is involved in the collision comparison.
   *
   * @returns Area for comparison of collisions
   */
  getCollisionArea(): TCollisionArea;

  /**
   * Returns the character's collision zone, which will be when moving in the specified direction.
   *
   * @param direction Direction of movement
   * @returns Coordinates and dimensions
   */
  getNextCollisionArea(direction: MovingDirection): TCollisionArea;

  /**
   * Character coordinate stream
   */
  coords$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;

  /**
   * Stream of traffic directions
   */
  movements$: Observable<MovingDirection>;

  /**
   * Coordinate stream when the character is in another cell
   */
  breakpoints$: Observable<[x: TNumberOfPixels, y: TNumberOfPixels]>;
}
