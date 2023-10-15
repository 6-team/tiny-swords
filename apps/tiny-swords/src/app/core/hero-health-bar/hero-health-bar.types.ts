export interface IHeroHealthBar {
  addLive(): void;
  unblockLive(): void;
}

export interface IHeroHealthBarConfig {
  totalLives: number;
  availableLives: number;
  blockedLives: number;
}
