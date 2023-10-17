import { BehaviorSubject, Observable } from 'rxjs';
import { IResource, ICollectingCharacter } from '../../common/common.types';
import { ICollecting } from '../abilities.types';

export class Collecting implements ICollecting {
  #context: ICollectingCharacter;
  #collectionSubject: BehaviorSubject<Array<IResource>> = new BehaviorSubject([]);
  collection$: Observable<Array<IResource>> = this.#collectionSubject.asObservable();

  /**
   * Устанавливает контекст/носителя данной способности.
   * Нужно, чтобы вызывать его методы, такие как показ анимации, изменение изображения и т.п.
   *
   * @param context Контекст
   * @returns Объект способности
   */
  setContext(context: ICollectingCharacter) {
    this.#context = context;

    return this;
  }

  /**
   * Помещает предмет коллекционирования в коллекцию
   *
   * @param item Предмет коллекционирования
   */
  collect(item: IResource) {
    const collection = this.#collectionSubject.getValue();
    this.#collectionSubject.next([...collection, item]);

    return this;
  }
}
