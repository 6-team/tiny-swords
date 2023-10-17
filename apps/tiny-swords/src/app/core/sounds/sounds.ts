import { ISounds, SoundType } from './sounds.types';

export class Sounds implements ISounds {
  private sounds: SoundType = {};

  addSound(name: string, url: string): void {
    const sound = new Audio(url);
    this.sounds[name] = sound;
  }

  playSound(name: string, volume = 1): void {
    if (!this.sounds[name]) return;

    const sound = this.sounds[name];
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  }

  stopSound(name: string): void {
    if (!this.sounds[name]) return;

    const sound = this.sounds[name];
    sound.pause();
    sound.currentTime = 0;
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
