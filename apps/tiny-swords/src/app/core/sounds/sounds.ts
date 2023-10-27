import { ISounds, SoundType } from './sounds.types';

/**
 * This class provides methods to handle sound operations.
 */
export class Sounds implements ISounds {
  private _sounds: SoundType = {};

  /**
   * This method adds a new sound to the sounds collection.
   * @param {string} name - The name of the sound.
   * @param {string} url - The URL of the sound file.
   */
  addSound(name: string, url: string): void {
    const sound = new Audio(url);
    this._sounds[name] = sound;
  }

  /**
   * This method plays a sound from the sounds collection.
   * @param {string} name - The name of the sound.
   * @param {number} [volume=1] - The volume of the sound. (Default is 1)
   */
  playSound(name: string, volume = 1): void {
    if (!this._sounds[name]) return;

    const sound = this._sounds[name];
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  }

  /**
   * This method stops a sound from the sounds collection.
   * @param {string} name - The name of the sound.
   */
  stopSound(name: string): void {
    if (!this._sounds[name]) return;

    const sound = this._sounds[name];
    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * This method checks if a given sound is currently being played.
   * @param {string} name - The name of the sound.
   * @returns {boolean} - Returns true if the sound is playing, otherwise false.
   */
  isPlaySound(name: string): boolean {
    return !this._sounds[name].paused;
  }

  /**
   * This method mutes all the sounds in the sounds collection.
   */
  muteSound(): void {
    for (const key in this._sounds) {
      this._sounds[key].muted = true;
    }
  }

  /**
   * This method unmutes all the sounds in the sounds collection.
   */
  unmuteSound(): void {
    for (const key in this._sounds) {
      this._sounds[key].muted = false;
    }
  }
}
