import { Moving } from './moving';
import { CharacterDirection, MovingDirection } from '@shared';
import { timer } from 'rxjs';
import { TNumberOfPixels, TPixelsPosition } from '@common/common.types';

jest.mock('svelte/store', () => ({
  writable: jest.fn(() => ({
    set: jest.fn(),
    update: jest.fn(),
    subscribe: jest.fn(),
  })),
}));
describe('Moving', () => {
  let moving: Moving;
  const fakeContext = {
    setAnimation: jest.fn(),
  };
  const initialX: TPixelsPosition = 0;
  const initialY: TPixelsPosition = 0;
  const height: TNumberOfPixels = 64;

  beforeEach(() => {
    moving = new Moving({ height, initialX, initialY });
    moving.setContext(fakeContext as any);
    jest.clearAllMocks();
  });

  test('should create Moving instance successfully', () => {
    expect(moving).toBeDefined();
  });

  test('should set coordinates successfully', () => {
    const newCoords: [TPixelsPosition, TPixelsPosition] = [100, 100];
    moving.setCoords(newCoords);
    expect(moving.coords).toEqual(newCoords);
  });

  test('should move to directions successfully', () => {
    Object.values(MovingDirection).forEach((direction) => {
      moving.moveTo(direction);
      expect(moving['_moveStream$'].getValue()).toBe(direction);
    });
  });

  test('should set character direction successfully', () => {
    Object.values(CharacterDirection).forEach((direction) => {
      moving.setCharacterDirection(direction);
      expect(moving['_direction']).toBe(direction);
    });
  });

  test('should animate direction successfully', (done) => {
    moving.animate(MovingDirection.RIGHT);

    timer(1000).subscribe(() => {
      expect(moving['_animationStream$'].getValue()).toBe(MovingDirection.RIGHT);
      done();
    });
  });
});
