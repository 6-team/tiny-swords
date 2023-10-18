import { IHeroHealthBar, IHeroHealthBarConfig } from './hero-health-bar.types';
import { HealthBar } from '../../entities/health-bar';

export class HeroHealthBar extends HealthBar<IHeroHealthBarConfig> implements IHeroHealthBar {
  private readonly initialHealthBarConfig: IHeroHealthBarConfig;
  constructor(healthBar: IHeroHealthBarConfig) {
    super();
    this.initialHealthBarConfig = healthBar;
    this.updateHealthBar(healthBar);
  }

  get blockedLives(): number {
    return this.healthBar.blockedLives;
  }

  unblockLive(): void {
    this.updateHealthBar({ blockedLives: this.blockedLives >= 1 ? this.blockedLives - 1 : 0 });
  }

  addLive(): void {
    const { blockedLives, availableLives, totalLives } = this.healthBar;

    if (availableLives + blockedLives < totalLives) {
      this.updateHealthBar({ availableLives: availableLives + 1 });
    }
  }

  resetHealthBar() {
    this.updateHealthBar(this.initialHealthBarConfig);
  }

  checkAddLive(): boolean {
    const { blockedLives, availableLives, totalLives } = this.healthBar;

    return availableLives + blockedLives < totalLives;
  }

  checkUnblockLive(): boolean {
    const { blockedLives } = this.healthBar;
    return !!blockedLives;
  }
}
