import { filter } from 'rxjs';

import { MovingDirection } from '@shared';

import { Sounds } from './sounds';
import { HeroSoundsType } from './sounds.const';
import { IResource } from '../../common/common.types';
import { HeroSoundsConfig } from './hero-sounds.types';

export class HeroSounds extends Sounds {
  constructor({ movable, attacking, collecting }: HeroSoundsConfig) {
    super();

    this.addSound(HeroSoundsType.MOVEMENT, 'sounds/running.mp3');
    this.addSound(HeroSoundsType.GAME_OVER, 'sounds/game_over_sound.wav');
    this.addSound(HeroSoundsType.RESOURCE, 'sounds/resource.wav');
    this.addSound(HeroSoundsType.ATTACK, 'sounds/sword.mp3');
    this.addSound(HeroSoundsType.HIT_ATTACK, 'sounds/hit_attack.mp3');
    this.addSound(HeroSoundsType.HITTING, 'sounds/hitting.mp3');

    movable.movement$.subscribe((direction) => {
      if (Object.values(MovingDirection).includes(direction) && !this.isPlaySound(HeroSoundsType.MOVEMENT)) {
        this.playMovementSound();
      }

      if (direction === MovingDirection.IDLE) this.stopMovementSound();
    });

    attacking.isAttacking$.pipe(filter(Boolean)).subscribe(() => {
      this.playAttackSound();
    });

    collecting.collection$.pipe(filter((resources: IResource[]) => !!resources.length)).subscribe(() => {
      this.playResourceSelection();
    });
  }

  playMovementSound() {
    this.playSound(HeroSoundsType.MOVEMENT);
  }

  stopMovementSound() {
    this.stopSound(HeroSoundsType.MOVEMENT);
  }

  playGameOverSound() {
    this.playSound(HeroSoundsType.GAME_OVER);
  }

  playResourceSelection() {
    this.playSound(HeroSoundsType.RESOURCE);
  }

  playAttackSound() {
    this.playSound(HeroSoundsType.ATTACK, 0.3);
  }

  playHittingSound() {
    this.playSound(HeroSoundsType.HITTING);
  }
}
