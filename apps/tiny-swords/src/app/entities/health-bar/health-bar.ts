import { IHealthBar, IHealthBarConfig } from './health-bar.types';
import { BehaviorSubject } from 'rxjs';

export abstract class HealthBar<T extends IHealthBarConfig = IHealthBarConfig> implements IHealthBar {
  protected readonly healthBarSubject: BehaviorSubject<T> = new BehaviorSubject<T>({ availableLives: 0 } as T);
  readonly healthBar$ = this.healthBarSubject.asObservable();

  get isDead(): boolean {
    return this.healthBar.availableLives === 0;
  }

  get healthBar(): T {
    return this.healthBarSubject.getValue();
  }

  removeLive(): void {
    this.updateHealthBar({ availableLives: this.healthBar.availableLives - 1 } as Partial<T>);
  }

  updateHealthBar(healthBar: Partial<T>): void {
    this.healthBarSubject.next({ ...this.healthBar, ...healthBar });
  }
}
