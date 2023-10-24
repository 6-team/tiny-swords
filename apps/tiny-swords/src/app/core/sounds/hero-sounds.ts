import { filter } from 'rxjs';

import { MovingDirection } from '@shared';

import { Sounds } from './sounds';
import { СharacterSoundsType } from './sounds.const';
import { IResource } from '../../common/common.types';
import { HeroSoundsConfig, IHeroSounds } from './hero-sounds.types';

export class HeroSounds extends Sounds implements IHeroSounds {
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

  playMovementSound() {
    this.playSound(СharacterSoundsType.MOVEMENT);
  }

  stopMovementSound() {
    this.stopSound(СharacterSoundsType.MOVEMENT);
  }

  playGameOverSound() {
    setTimeout(() => this.playSound(СharacterSoundsType.GAME_OVER), 500);
  }

  playResourceSelection() {
    this.playSound(СharacterSoundsType.RESOURCE);
  }

  playAttackSound() {
    this.playSound(СharacterSoundsType.ATTACK, 0.3);
  }

  playHittingSound() {
    this.playSound(СharacterSoundsType.HITTING);
  }
}
