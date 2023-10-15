import { SoundType, SoundsProps } from './sounds.types';
import { MovingDirection, AttackingType } from '@shared';
import { HeroSoundsType } from './sounds.const';
import { filter } from 'rxjs';
import { ResourcesType } from '../../entities/resource';
import { IResource } from '../../common/common.types';

export class Sounds {
  private sounds: SoundType;

  constructor() {
    this.sounds = {};
  }

  addSound(name: string, url: string): void {
    const sound = new Audio(url);
    this.sounds[name] = sound;
  }

  playSound(name: string, volume = 1): void {
    if (this.sounds[name]) {
      const sound = this.sounds[name];
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play();
    }
  }

  stopSound(name: string): void {
    if (this.sounds[name]) {
      const sound = this.sounds[name];
      sound.pause();
      sound.currentTime = 0;
    }
  }

  isPlaySound(name: string): boolean {
    return !this.sounds[name].paused;
  }

  muteSound(): void {
    for (const key in this.sounds) {
      this.sounds[key].muted = true;
    }
  }

  unmuteSound(): void {
    for (const key in this.sounds) {
      this.sounds[key].muted = false;
    }
  }
}

export class HeroSounds extends Sounds {
  constructor({ movable, attacking, collecting }: SoundsProps) {
    super();

    this.addSound(HeroSoundsType.MOVEMENT, 'sounds/running.mp3');
    this.addSound(HeroSoundsType.GAME_OVER, 'sounds/game_over_sound.wav');
    this.addSound(HeroSoundsType.RESOURCE, 'sounds/resource.wav');
    this.addSound(HeroSoundsType.ATTACK, 'sounds/sword.mp3');
    this.addSound(HeroSoundsType.HIT_ATTACK, 'sounds/hit_attack.mp3');
    this.addSound(HeroSoundsType.HITTING, 'sounds/hitting.mp3');

    const controller = movable.getController();

    controller.movement$.subscribe((direction) => {
      if (Object.values(MovingDirection).includes(direction) && !this.isPlaySound(HeroSoundsType.MOVEMENT)) {
        this.playMovementSound();
      }
      if (direction === MovingDirection.IDLE) this.stopMovementSound();
    });

    attacking.attack$.subscribe(() => {
      this.playAttackSound();
    });

    collecting.collection$.pipe(filter((resources: IResource[]) => resources.length > 0)).subscribe((resources) => {
      if (resources.length !== 0) {
        this.playResourceSelection();
      }
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
