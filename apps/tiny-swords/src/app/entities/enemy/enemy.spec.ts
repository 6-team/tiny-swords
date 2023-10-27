import Enemy from './enemy';
import { EnemyConfig } from './enemy.types';
import { Moving } from '@abilities/moving';
import { Fighting } from '@abilities/fighting';
import { EnemySound } from '@core/sounds/enemy-sounds';
import { isMuttedStore } from '@store';
import { EnemyType } from './enemy.const';
import { CharacterDirection } from '@shared';

jest.mock('@store', () => ({
  isMuttedStore: {
    subscribe: jest.fn(),
  },
}));
jest.mock('@abilities/moving');
jest.mock('@abilities/fighting');
jest.mock('@core/sounds/enemy-sounds');
jest.mock('@store');

describe('Enemy', () => {
  let enemyConfig: EnemyConfig;
  let enemy: Enemy;

  beforeEach(() => {
    enemyConfig = {
      height: 192,
      width: 192,
      initialX: 0,
      initialY: 0,
      initialDirection: CharacterDirection.LEFT,
      id: 'enemy1',
    };

    (isMuttedStore.subscribe as jest.Mock).mockImplementation((cb) => cb(false));

    enemy = new Enemy(enemyConfig);
  });

  it('should be created', () => {
    expect(enemy).toBeInstanceOf(Enemy);
  });

  it('should have correct initialized properties', () => {
    expect((enemy as any)._type).toBe(EnemyType.TORCH_RED);
    expect((enemy as any)._sprite).toBe('./img/Factions/Goblins/Troops/Torch/Red/Torch_Red.png');
    expect((enemy as any)._size).toBe(192);
    expect(enemy.moving).toBeInstanceOf(Moving);
    expect(enemy.fighting).toBeInstanceOf(Fighting);
    expect((enemy as any)._sounds).toBeInstanceOf(EnemySound);
  });

  it('should subscribe to isMuttedStore', () => {
    expect(isMuttedStore.subscribe).toHaveBeenCalled();
  });

  it('should call unmuteSound when isMuttedStore returns false', () => {
    (isMuttedStore.subscribe as jest.Mock).mock.calls[0][0](false);
    expect((enemy as any)._sounds.unmuteSound).toHaveBeenCalled();
  });
});
