import { BehaviorSubject, Observable } from 'rxjs';
import { IResource } from '@common/common.types';
import { ICollecting, ICollectingCharacter } from './collecting.types';

/**
 * This class implements the ICollecting interface and provides functionality to collect items of type IResource.
 * @implements {ICollecting}
 */
export class Collecting implements ICollecting {
  private _context: ICollectingCharacter;
  private _collectionSubject: BehaviorSubject<Array<IResource>> = new BehaviorSubject([]);
  collection$: Observable<Array<IResource>> = this._collectionSubject.asObservable();

  /**
   * Sets the context/carrier of this ability.
   * Needed to call its methods, such as showing animations, changing the image, etc.
   *
   * @param {ICollectingCharacter} context Context
   * @returns {Collecting} - The instance of the class
   */
  setContext(context: ICollectingCharacter): this {
    this._context = context;

    return this;
  }

  /**
   *  Places an item in a collection
   *
   * @param {IResource} item - The item to be collected
   * @returns {Collecting} - The instance of the class
   */
  collect(item: IResource): this {
    const collection = this._collectionSubject.getValue();
    this._collectionSubject.next([...collection, item]);

    return this;
  }
}
