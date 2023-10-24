import { HeroSoundsConfig } from './hero-sounds.types';
import { HeroSounds } from './hero-sounds';
import { СharacterSoundsType } from './sounds.const';

import { of } from 'rxjs';

describe('HeroSounds', () => {
  let heroSound: HeroSounds;
  const mockAttacking: any = {
    isAttacking$: of(true),
    isHitted$: of(true),
    isDied$: of(true),
  };

  const mockMovable: any = {
    getController() {
      return {
        movement$: of(true),
      };
    },
  };

  const mockCollecting: any = {
    collection$: of(true),
  };

  beforeEach(() => {
    const config: HeroSoundsConfig = { attacking: mockAttacking, movable: mockMovable, collecting: mockCollecting };
    heroSound = new HeroSounds(config);
    jest.spyOn(heroSound, 'playSound');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should play attack sound when isAttacking$ event is emitted', () => {
    heroSound.playAttackSound();
    expect(heroSound.playSound).toHaveBeenCalledWith(СharacterSoundsType.ATTACK, 0.3);
  });

  it('should play hitting sound when isHitted$ event is emitted', () => {
    heroSound.playHittingSound();
    expect(heroSound.playSound).toHaveBeenCalledWith(СharacterSoundsType.HITTING);
  });

  it('should play movement sound when movement$ event is emitted', () => {
    heroSound.playMovementSound();
    expect(heroSound.playSound).toHaveBeenCalledWith(СharacterSoundsType.MOVEMENT);
  });

  it('should play resource selection sound', () => {
    heroSound.playResourceSelection();
    expect(heroSound.playSound).toHaveBeenCalledWith(СharacterSoundsType.RESOURCE);
  });
});
