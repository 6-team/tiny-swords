import Hero from './Hero';
import { HeroType } from './hero.const';
import { Moving } from '@abilities/moving';
import { Fighting } from '@abilities/fighting';
import { Collecting } from '@abilities/collecting';
jest.mock('@store', () => ({
  isMuttedStore: {
    subscribe: jest.fn(),
  },
}));

describe('Hero', () => {
  let hero: Hero;

  beforeEach(() => {
    hero = new Hero({
      height: 192,
      width: 192,
      initialX: 0,
      initialY: 0,
      id: '1',
      type: HeroType.WARRIOR_BLUE,
    });
  });

  test('get moving returns correct ability', () => {
    const movingAbility = hero.getAbility('moving');
    expect(movingAbility).toBeInstanceOf(Moving);
  });

  test('get fighting returns correct ability', () => {
    const fightingAbility = hero.getAbility('fighting');
    expect(fightingAbility).toBeInstanceOf(Fighting);
  });

  test('get collecting returns correct ability', () => {
    const collectingAbility = hero.getAbility('collecting');
    expect(collectingAbility).toBeInstanceOf(Collecting);
  });
});
