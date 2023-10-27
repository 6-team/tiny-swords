import { EnemySoundsConfig, IEnemySounds } from './enemy-sounds.types';
import { filter } from 'rxjs';
import { Sounds, СharacterSoundsType } from '@core/sounds/';

/**
 * EnemySound class extends the Sounds class,
 * implementing the IEnemySounds interface, and thus providing
 * a set of defined methods to control the sound for enemy characters.
 *
 * @extends {Sounds}
 * @implements {IEnemySounds}
 */
export class EnemySound extends Sounds implements IEnemySounds {
  /**
   * Creates an instance of EnemySound.
   *
   * @param {EnemySoundsConfig} { fighting } - fighting configuration for the enemy sounds.
   */
  constructor({ fighting }: EnemySoundsConfig) {
    super();
    this.addSound(СharacterSoundsType.ATTACK, 'sounds/fire-attack.mp3');
    this.addSound(СharacterSoundsType.HITTING, 'sounds/goblin_death.mp3');

    fighting.isAttacking$.pipe(filter(Boolean)).subscribe(() => {
      this.playAttackSound();
    });

    fighting.isHitted$.subscribe(() => this.playHittingSound());
  }

  /**
   * Plays the attack sound for the enemy character.
   * The `ATTACK` sound is played with a volume of `0.3`.
   */
  playAttackSound(): void {
    this.playSound(СharacterSoundsType.ATTACK, 0.3);
  }

  /**
   * Plays the hitting sound for the enemy character.
   * The `HITTING` sound is played with the default volume.
   */
  playHittingSound(): void {
    this.playSound(СharacterSoundsType.HITTING);
  }
}
