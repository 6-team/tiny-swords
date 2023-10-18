export interface IHeroHealthBar {
  addLive(): void;
  unblockLive(): void;
  checkAddLive(): boolean;
  checkUnblockLive(): boolean;
}

export interface IHeroHealthBarConfig {
  totalLives: number;
  availableLives: number;
  blockedLives: number;
}
