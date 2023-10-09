import { IHeroHealthBar } from './hero-health-bar.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { HealthBar } from '../../entities/health-bar';

export class HeroHealthBar<
    LiveTypes extends {
      totalLives: number;
      availableLives: number;
      blockedLives: number;
    },
  >
  extends HealthBar<LiveTypes>
  implements IHeroHealthBar
{
  _healthBarSubject: BehaviorSubject<LiveTypes>;
  healthBar$: Observable<LiveTypes>;

  constructor(healthBar: LiveTypes) {
    super();
    this._healthBarSubject = new BehaviorSubject<LiveTypes>(healthBar);
    this.healthBar$ = this._healthBarSubject.asObservable();
  }

  unblockLive(): void {
    this._healthBarSubject.next({
      ...this._healthBarSubject.getValue(),
      blockedLives: 0,
    });
  }

  addLive(): void {
    const healthBar = this._healthBarSubject.getValue();
    if (healthBar.availableLives + healthBar.blockedLives < healthBar.totalLives) {
      this._healthBarSubject.next({
        ...healthBar,
        availableLives: healthBar.availableLives + 1,
      });
    }
  }

  get lives() {
    return this._healthBarSubject.getValue();
  }
}
