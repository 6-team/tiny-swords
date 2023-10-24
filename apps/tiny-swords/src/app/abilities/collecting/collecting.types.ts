import { Observable } from 'rxjs';
import { IAbility } from '../abilities.types';
import { ICharacter, IResource } from '../../common/common.types';

export type ICollectingCharacter = ICharacter<{ collecting: ICollecting }> & {
  collecting: ICollecting;
};

export interface ICollecting extends IAbility<ICollectingCharacter> {
  /**
   * Поток, в котором приходят массивы ресурсов, имеющихся у персонажа
   */
  collection$: Observable<Array<IResource>>;

  /**
   * Помещает предмет коллекционирования в коллекцию
   *
   * @param item Предмет коллекционирования
   */
  collect(item: IResource): this;
}
