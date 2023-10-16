export type SoundType = {
  [key: string]: HTMLAudioElement;
};

export interface ISounds {
  addSound(name: string, url: string): void;
  playSound(name: string, volume?: number): void;
  stopSound(name: string): void;
  isPlaySound(name: string): void;
  muteSound(): void;
  unmuteSound(): void;
}
