import { EnemySoundsConfig, IEnemySounds } from './enemy-sounds.types';
import { filter } from 'rxjs';

import { Sounds } from './sounds';
import { СharacterSoundsType } from './sounds.const';

export class EnemySound extends Sounds implements IEnemySounds {
  constructor({ attacking }: EnemySoundsConfig) {
    super();
    this.addSound(СharacterSoundsType.ATTACK, 'sounds/fire-attack.mp3');
    this.addSound(СharacterSoundsType.HITTING, 'sounds/goblin_death.mp3');

    attacking.isAttacking$.pipe(filter(Boolean)).subscribe(() => {
      this.playAttackSound();
    });

    attacking.isHitted$.subscribe(() => this.playHittingSound());
  }

  playAttackSound() {
    this.playSound(СharacterSoundsType.ATTACK, 0.3);
  }

  playHittingSound() {
    this.playSound(СharacterSoundsType.HITTING);
  }
}
