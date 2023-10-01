import { IResource, ICollectingCharacter } from '../../common/common.types';
import { ICollecting } from '../abilities.types';

export class Collecting implements ICollecting {
  #context: ICollectingCharacter;
  #collection: Array<IResource> = [];

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
    this.#collection.push(item);

    console.log(this.#collection);

    return this;
  }
}
