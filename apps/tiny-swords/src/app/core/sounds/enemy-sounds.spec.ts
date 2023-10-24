import { EnemySoundsConfig } from './enemy-sounds.types';
import { EnemySound } from './enemy-sounds';
import { СharacterSoundsType } from './sounds.const';

import { of } from 'rxjs';

describe('EnemySound', () => {
  let enemySound: EnemySound;
  const mockAttacking: any = {
    isAttacking$: of(true),
    isHitted$: of(true),
  };

  beforeEach(() => {
    const config: EnemySoundsConfig = { attacking: mockAttacking };
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
