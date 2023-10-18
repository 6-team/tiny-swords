import { Observable } from 'rxjs';
import { MovingDirection, AttackingType } from '@shared';
import { IAttackingCharacter, IMovableCharacter } from '../common/common.types';

export interface IController {
  movement$: Observable<MovingDirection>;
  animation$: Observable<MovingDirection>;
  attack$: Observable<AttackingType>;

  /**
   * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
   */
  setCharacter?(character: IMovableCharacter & IAttackingCharacter): this;

  /**
   * @TODO Убрать это безобразие, когда будем прокидывать персонажа в контроллер, а не наоборот
   */
  init?(): this;
}
