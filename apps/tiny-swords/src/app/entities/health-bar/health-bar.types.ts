export interface IHealthBar {
  isDead: boolean;
  removeLive(): void;
}

export interface IHealthBarConfig {
  availableLives: number;
}
