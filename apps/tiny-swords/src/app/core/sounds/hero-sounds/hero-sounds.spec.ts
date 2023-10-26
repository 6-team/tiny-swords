import { HeroSounds } from './hero-sounds';
import { of } from 'rxjs';
import { СharacterSoundsType } from '@core/sounds/sounds.const';
import { MovingDirection } from '@shared';

describe('HeroSounds', () => {
  let mockMoving: any;
  let mockFighting: any;
  let mockCollecting: any;

  beforeEach(() => {
    mockMoving = {
      movements$: of({}),
    };

    mockFighting = {
      isAttacking$: of({}),
      isHitted$: of({}),
      isDied$: of({}),
    };

    mockCollecting = {
      collection$: of({}),
    };
  });

  it('plays movement sound when character moves', () => {
    const sounds = new HeroSounds({
      moving: {
        ...mockMoving,
        movements$: of(MovingDirection.DOWN),
      },
      fighting: mockFighting,
      collecting: mockCollecting,
    });

    jest.spyOn(sounds, 'playSound');

    sounds.playMovementSound();

    expect(sounds.playSound).toHaveBeenCalledWith(СharacterSoundsType.MOVEMENT);
  });

  it('plays movement sound when character attack', () => {
    const sounds = new HeroSounds({
      moving: mockMoving,
      fighting: mockFighting,
      collecting: mockCollecting,
    });

    jest.spyOn(sounds, 'playSound');

    sounds.playAttackSound();

    expect(sounds.playSound).toHaveBeenCalledWith(СharacterSoundsType.ATTACK, 0.3);
  });

  it('plays collection sound when character resource collected', () => {
    const sounds = new HeroSounds({
      moving: mockMoving,
      fighting: mockFighting,
      collecting: mockCollecting,
    });

    jest.spyOn(sounds, 'playSound');

    sounds.playResourceSelection();

    expect(sounds.playSound).toHaveBeenCalledWith(СharacterSoundsType.RESOURCE);
  });
});
