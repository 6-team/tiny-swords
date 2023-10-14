import { IHeroHealthBar, IHeroHealthBarConfig } from './hero-health-bar.types';
import { HealthBar } from '../../entities/health-bar';

export class HeroHealthBar extends HealthBar<IHeroHealthBarConfig> implements IHeroHealthBar {
  constructor(healthBar: IHeroHealthBarConfig) {
    super();
    this.updateHealthBar(healthBar);
  }

  unblockLive(): void {
    this.updateHealthBar({ blockedLives: 0 });
  }

  addLive(): void {
    if (this.healthBar.availableLives + this.healthBar.blockedLives < this.healthBar.totalLives) {
      this.updateHealthBar({ availableLives: this.healthBar.availableLives + 1 });
    }
  }
}
