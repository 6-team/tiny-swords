import { Observable } from 'rxjs';
import { AttackingForce } from '../abilities.const';

export interface AttackingProps {
  stream$: Observable<AttackingForce>;
}
