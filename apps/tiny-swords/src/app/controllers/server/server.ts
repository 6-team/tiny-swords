import { filter } from 'rxjs';
import { IController } from '../controllers.types';
import { actions } from '../../core';
import { IMovableCharacter, IAttackingCharacter } from '../../common/common.types';
import { IServerControllerProps } from './server.types';

export default class ServerController implements IController {
  private _character: IMovableCharacter & IAttackingCharacter;

  constructor({ id, character }: IServerControllerProps) {
    this._character = character;

    actions
      .updatePlayerListener()
      .pipe(filter((player) => player.id === id))
      .subscribe((player) => {
        if (player.hasOwnProperty('attackingType')) {
          character.fighting.attack(player.attackingType);
        }

        if (player.hasOwnProperty('direction')) {
          character.moving.moveTo(player.direction);
          character.moving.animate(player.direction);
        }

        if (player.hasOwnProperty('breakpoint')) {
          const movable = this._character.getAbility('movable');

          if (movable.coords[0] !== player.breakpoint[0] || movable.coords[1] !== player.breakpoint[1]) {
            character.moving.setCoords(player.breakpoint);
          }
        }
      });
  }
}
