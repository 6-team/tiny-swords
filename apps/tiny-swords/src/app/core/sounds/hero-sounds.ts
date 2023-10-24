import { filter } from 'rxjs';

import { MovingDirection } from '@shared';

import { Sounds } from './sounds';
import { СharacterSoundsType } from './sounds.const';
import { IResource } from '@common/common.types';
import { HeroSoundsConfig, IHeroSounds } from './hero-sounds.types';

/**
 * Класс для работы со свуками героя
 */
export class HeroSounds extends Sounds implements IHeroSounds {
  constructor({ movable, attacking, collecting }: HeroSoundsConfig) {
    super();

    this.addSound(СharacterSoundsType.MOVEMENT, 'sounds/running.mp3');
    this.addSound(СharacterSoundsType.GAME_OVER, 'sounds/game_over_sound.wav');
    this.addSound(СharacterSoundsType.RESOURCE, 'sounds/resource.wav');
    this.addSound(СharacterSoundsType.ATTACK, 'sounds/sword.mp3');
    this.addSound(СharacterSoundsType.HIT_ATTACK, 'sounds/hit_attack.mp3');
    this.addSound(СharacterSoundsType.HITTING, 'sounds/hitting.mp3');

    const controller = movable.getController();

    controller.movement$.subscribe((direction) => {
      if (Object.values(MovingDirection).includes(direction) && !this.isPlaySound(СharacterSoundsType.MOVEMENT)) {
        this.playMovementSound();
      }

      if (direction === MovingDirection.IDLE) this.stopMovementSound();
    });

    attacking.isAttacking$.pipe(filter(Boolean)).subscribe(() => {
      this.playAttackSound();
    });

    attacking.isHitted$.subscribe(() => this.playHittingSound());

    attacking.isDied$.subscribe(() => this.playGameOverSound());

    collecting.collection$.pipe(filter((resources: IResource[]) => !!resources.length)).subscribe(() => {
      this.playResourceSelection();
    });
  }

  /**
   * Воспроизведение звука ходьбы
   */
  playMovementSound() {
    this.playSound(СharacterSoundsType.MOVEMENT);
  }

  /**
   * Остановка звука ходьбы
   */
  stopMovementSound() {
    this.stopSound(СharacterSoundsType.MOVEMENT);
  }

  /**
   * Воспроизведение звука когда герой погиб
   */
  playGameOverSound() {
    setTimeout(() => this.playSound(СharacterSoundsType.GAME_OVER), 500);
  }

  /**
   * Воспроизведение звука подбора ресурсов
   */
  playResourceSelection() {
    this.playSound(СharacterSoundsType.RESOURCE);
  }

  /**
   * Воспроизведение звука атаки
   */
  playAttackSound() {
    this.playSound(СharacterSoundsType.ATTACK, 0.3);
  }

  /**
   * Воспроизведение звука когда по герою попадают
   */
  playHittingSound() {
    this.playSound(СharacterSoundsType.HITTING);
  }
}
