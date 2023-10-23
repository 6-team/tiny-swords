import { filter, fromEvent, map } from 'rxjs';
import { IAttackingCharacter } from '../../common/common.types';
import { mapButtonToAttackType } from './mouse.const';
import { AttackingType } from '@shared';

export class MouseController {
  constructor({ character }: { character: IAttackingCharacter }) {
    fromEvent(document.body, 'click')
      .pipe(
        filter((event: Event) => event instanceof MouseEvent),
        map<MouseEvent, AttackingType>((event) => mapButtonToAttackType[event.button]),
      )
      .subscribe((type: AttackingType) => {
        character.fighting.attack(type);
      });
  }
}
