import { Subject } from 'rxjs';
import { AttackingForce, MovingDirection } from '../../abilities/abilities.const';
import { IController } from '../controllers.types';

export default class ServerController implements IController {
  private _movement$ = new Subject<MovingDirection>();
  private _attack$ = new Subject<AttackingForce>();

  readonly movement$ = this._movement$.asObservable();
  readonly attack$ = this._attack$.asObservable();

  /**
   * Для примера персонаж ходит по кругу.
   * В итоге здесь будет получение команд от бэка и отправка команды на движение в поток. Аналогично с атакой.
   */
  constructor() {
    const directions = [
      MovingDirection.RIGHT,
      MovingDirection.DOWN,
      MovingDirection.LEFT,
      MovingDirection.UP,
      MovingDirection.IDLE,
    ];

    let current = 0;

    setInterval(() => {
      this._movement$.next(directions[current]);
      current = (current + 1) % directions.length;
    }, 2000);
  }
}
