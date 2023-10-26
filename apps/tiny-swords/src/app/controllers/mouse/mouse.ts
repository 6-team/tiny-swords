import { filter, fromEvent, map } from 'rxjs';
import { mapButtonToAttackType } from './mouse.const';
import { AttackingType } from '@shared';
import { IFightingCharacter } from '../../abilities/fighting/fighting.types';

export class MouseController {
  constructor({ character }: { character: IFightingCharacter }) {
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
