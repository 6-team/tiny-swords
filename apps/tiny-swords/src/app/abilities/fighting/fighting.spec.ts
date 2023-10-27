import { BehaviorSubject } from 'rxjs';
import { AttackingType } from '@shared';
import { Fighting } from './Fighting'; // wherever you 'Fighting' class is located

describe('Fighting class tests', () => {
  let fighting;
  beforeEach(() => {
    fighting = new Fighting({
      getAffectedArea: jest.fn(),
      availibleLives: 3,
      blockedLives: 2,
    });
  });

  test('constructor must initialize fields correctly', () => {
    expect(fighting._livesCount$ instanceof BehaviorSubject).toBeTruthy();
    expect(fighting._blockedLivesCount$ instanceof BehaviorSubject).toBeTruthy();
    expect(fighting._livesCount$.getValue()).toBe(3);
    expect(fighting._blockedLivesCount$.getValue()).toBe(2);
  });

  test('method takeDamage must decrease lives count', () => {
    fighting.takeDamage();
    expect(fighting._livesCount$.getValue()).toBe(2);
  });

  test('method addLive should increment the lives if total lives less than TOTAL_LIVES', () => {
    fighting.addLive();
    expect(fighting._livesCount$.getValue()).toBe(3);
  });

  test('method addLive should not increment the lives if total lives equal to TOTAL_LIVES', () => {
    fighting._livesCount$.next(8);
    fighting._blockedLivesCount$.next(2);
    fighting.addLive();
    expect(fighting._livesCount$.getValue()).toBe(8);
  });

  test("method unblockLive should decrease blocked lives count if it's more than 0", () => {
    fighting.unblockLive();
    expect(fighting._blockedLivesCount$.getValue()).toBe(1);
  });

  test('method reset should reset lives and blocked lives to initial values', () => {
    fighting.takeDamage(); // livesCount becomes 2
    fighting.unblockLive(); // blockedLivesCount becomes 1
    fighting.reset();
    expect(fighting._livesCount$.getValue()).toBe(3);
    expect(fighting._blockedLivesCount$.getValue()).toBe(2);
  });

  test('method checkAddLive should return false if total lives equals TOTAL_LIVES', () => {
    fighting._livesCount$.next(8);
    fighting._blockedLivesCount$.next(2);
    expect(fighting.checkAddLive()).toBeFalsy();
  });

  test('method checkUnblockLive should return false if blocked lives equals 0', () => {
    fighting._blockedLivesCount$.next(0);
    expect(fighting.checkUnblockLive()).toBeFalsy();
  });

  test('method attack should work only if the character is not moving and not already attacking', () => {
    const context = {
      moving: { isMoving: false, isRightDirection: true },
      setAnimationOnce: jest.fn().mockResolvedValue('Test animation'),
    };
    fighting.setContext(context);
    fighting.attack(AttackingType.DOWN);
    expect(fighting._isAttacking$.getValue()).toBeTruthy();
  });
});
