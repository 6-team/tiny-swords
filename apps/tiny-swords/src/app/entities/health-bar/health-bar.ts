import { IHealthBar } from './health-bar.types';
import { BehaviorSubject } from 'rxjs';

export abstract class HealthBar<T extends { availableLives: number }> implements IHealthBar {
  protected abstract _healthBarSubject: BehaviorSubject<T>;

  removeLive(): void {
    const healthValue = this._healthBarSubject.getValue();

    this._healthBarSubject.next({
      ...healthValue,
      availableLives: healthValue.availableLives - 1,
    });
  }

  get isDead(): boolean {
    return this._healthBarSubject.getValue().availableLives === 0;
  }
}
