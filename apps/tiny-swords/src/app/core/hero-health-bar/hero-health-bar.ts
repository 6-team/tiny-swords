import { IHeroHealthBar, IHeroHealthBarConfig } from './hero-health-bar.types';
import { HealthBar } from '../../entities/health-bar';

export class HeroHealthBar extends HealthBar<IHeroHealthBarConfig> implements IHeroHealthBar {
  constructor(healthBar: IHeroHealthBarConfig) {
    super();
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
}
