import { Moving } from './moving';
import { MovingDirection, CharacterDirection } from '@shared';

jest.mock('@store', () => ({
  isMuttedStore: {
    subscribe: jest.fn(),
  },
}));

jest.mock('@tools/observables', () => {
  const { BehaviorSubject } = require('rxjs');
  return {
    animationInterval$: new BehaviorSubject(null),
  };
});
jest.mock('@core/grid', () => ({
  grid64: {
    tileSize: 64,
  },
}));

describe('Moving', () => {
  let moving;

  beforeEach(() => {
    const props = {
      height: 200,
      width: 200,
      initialX: 0,
      initialY: 0,
    };
    moving = new Moving(props);
    moving.setContext({
      setAnimation: jest.fn(),
    });
  });

  test('setContext method should set context', () => {
    const context = {
      setAnimation: jest.fn(),
    };
    moving.setContext(context);
    expect(moving._context).toBe(context);
  });

  test('setCharacterDirection method should set character direction', () => {
    moving.setCharacterDirection(CharacterDirection.LEFT);
    expect(moving._direction).toBe(CharacterDirection.LEFT);

    moving.setCharacterDirection(CharacterDirection.RIGHT);
    expect(moving._direction).toBe(CharacterDirection.RIGHT);
  });

  test('setCoords method should correctly set coordinates', () => {
    const coords = [200, 200];
    moving.setCoords(coords);
    expect(moving._coords$.getValue()).toEqual(coords);
  });

  test('moveTo method should signal the direction of movement', () => {
    moving.moveTo(MovingDirection.RIGHT);
    expect(moving._moveStream$.getValue()).toBe(MovingDirection.RIGHT);
  });

  test('animate method sets direction for animation', () => {
    moving.animate(MovingDirection.LEFT);
    expect(moving._animationStream$.getValue()).toBe(MovingDirection.LEFT);
  });
});
