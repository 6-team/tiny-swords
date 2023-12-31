import { EnemySoundsConfig } from './enemy-sounds.types';
import { EnemySound } from './enemy-sounds';
import { СharacterSoundsType } from '@core/sounds/sounds.const';

import { of } from 'rxjs';

global.HTMLMediaElement.prototype.play = () => {
  return Promise.resolve();
};
describe('EnemySound', () => {
  let enemySound: EnemySound;
  const mockFighting: any = {
    isAttacking$: of(true),
    isHitted$: of(true),
  };

  beforeEach(() => {
    const config: EnemySoundsConfig = { fighting: mockFighting };
    enemySound = new EnemySound(config);
    jest.spyOn(enemySound, 'playSound');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should play attack sound when isAttacking$ event is emitted', () => {
    enemySound.playAttackSound();
    expect(enemySound.playSound).toHaveBeenCalledWith(СharacterSoundsType.ATTACK, 0.3);
  });

  it('should play hitting sound when isHitted$ event is emitted', () => {
    enemySound.playHittingSound();
    expect(enemySound.playSound).toHaveBeenCalledWith(СharacterSoundsType.HITTING);
  });
});
