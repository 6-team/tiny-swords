import { Observable } from 'rxjs';
import { IAbility } from '@abilities/abilities.types';
import { ICharacter, IResource } from '@common/common.types';

export type ICollectingCharacter = ICharacter<{ collecting: ICollecting }> & {
  collecting: ICollecting;
};

export interface ICollecting extends IAbility<ICollectingCharacter> {
  /**
   * A stream in which arrays of resources available to a character come in
   */
  collection$: Observable<Array<IResource>>;

  /**
   * Places an item in a collection
   *
   * @param item Collector's item
   */
  collect(item: IResource): this;
}
