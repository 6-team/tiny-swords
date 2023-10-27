import { filter } from 'rxjs';
import { MovingDirection } from '@shared';
import { Sounds, СharacterSoundsType } from '@core/sounds';
import { IResource } from '@common/common.types';
import { HeroSoundsConfig, IHeroSounds } from './hero-sounds.types';

/**
 * `HeroSounds` class for managing and controlling the game character's sound effects.
 *
 * @class
 * @extends {Sounds}
 * @implements {IHeroSounds}
 */
export class HeroSounds extends Sounds implements IHeroSounds {
  /**
   * Creates a new `HeroSounds` instance.
   *
   * Initializes all the different types of sounds, and sets reaction to different game events such as movement,
   * fighting, and collecting resources.
   *
   * @param {Object} { moving, fighting, collecting } - The configuration object for hero sound management.
   * @param {Object} moving - The stream of moving events.
   * @param {Object} fighting - The stream of fighting events.
   * @param {Object} collecting - The stream of resource collecting events.
   */
  constructor({ moving, fighting, collecting }: HeroSoundsConfig) {
    super();

    this.addSound(СharacterSoundsType.MOVEMENT, 'sounds/running.mp3');
    this.addSound(СharacterSoundsType.GAME_OVER, 'sounds/game_over_sound.wav');
    this.addSound(СharacterSoundsType.RESOURCE, 'sounds/resource.wav');
    this.addSound(СharacterSoundsType.ATTACK, 'sounds/sword.mp3');
    this.addSound(СharacterSoundsType.HIT_ATTACK, 'sounds/hit_attack.mp3');
    this.addSound(СharacterSoundsType.HITTING, 'sounds/hitting.mp3');

    moving.movements$.subscribe((direction) => {
      if (Object.values(MovingDirection).includes(direction) && !this.isPlaySound(СharacterSoundsType.MOVEMENT)) {
        this.playMovementSound();
      }

      if (direction === MovingDirection.IDLE) this.stopMovementSound();
    });

    fighting.isAttacking$.pipe(filter(Boolean)).subscribe(() => {
      this.playAttackSound();
    });

    fighting.isHitted$.subscribe(() => this.playHittingSound());

    fighting.isDied$.subscribe(() => this.playGameOverSound());

    collecting.collection$.pipe(filter((resources: IResource[]) => !!resources.length)).subscribe(() => {
      this.playResourceSelection();
    });
  }

  /**
   * Plays the movement sound if it isn't already playing.
   */
  playMovementSound() {
    this.playSound(СharacterSoundsType.MOVEMENT);
  }

  /**
   * Stops the movement sound if it's currently playing.
   */
  stopMovementSound() {
    this.stopSound(СharacterSoundsType.MOVEMENT);
  }

  /**
   * Plays the game-over sound with a delay of 500ms.
   */
  playGameOverSound() {
    setTimeout(() => this.playSound(СharacterSoundsType.GAME_OVER), 500);
  }

  /**
   * Plays the resource selection sound when resources are collected.
   */
  playResourceSelection() {
    this.playSound(СharacterSoundsType.RESOURCE);
  }

  /**
   * Plays the attack sound at a specified volume (0.3 in this case).
   */
  playAttackSound() {
    this.playSound(СharacterSoundsType.ATTACK, 0.3);
  }

  /**
   * Plays the hitting sound when the hero is hit.
   */
  playHittingSound() {
    this.playSound(СharacterSoundsType.HITTING);
  }
}
