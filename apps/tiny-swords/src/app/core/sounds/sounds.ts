import { ISounds, SoundType } from './sounds.types';

/**
 * Класс для работы со звуками
 * с базовыми методами воспроизведения
 */
export class Sounds implements ISounds {
  private _sounds: SoundType = {};

  /**
   * Добавляем звук
   * @param name название звука
   * @param url путь к файлу
   */
  addSound(name: string, url: string): void {
    const sound = new Audio(url);
    this._sounds[name] = sound;
  }

  /**
   * Воспроизведение звука
   * @param name название воспроизводимого звука
   * @param volume установленая грокмость
   * @returns
   */
  playSound(name: string, volume = 1): void {
    if (!this._sounds[name]) return;

    const sound = this._sounds[name];
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  }

  /**
   * Остановка звука
   * @param name название звука
   * @returns
   */
  stopSound(name: string): void {
    if (!this._sounds[name]) return;

    const sound = this._sounds[name];
    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * Проверка воспроизводится ли звук
   * @param name название звука
   * @returns воспроизводится ли звук
   */
  isPlaySound(name: string): boolean {
    return !this._sounds[name].paused;
  }

  /**
   * Выключить звуки
   */
  muteSound(): void {
    for (const key in this._sounds) {
      this._sounds[key].muted = true;
    }
  }

  /**
   * Включить звуки
   */
  unmuteSound(): void {
    for (const key in this._sounds) {
      this._sounds[key].muted = false;
    }
  }
}
