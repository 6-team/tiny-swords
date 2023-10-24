import { of } from 'rxjs';
import { Collisions } from './collisions';
import { MovingDirection } from '@shared';
import { TPixelsCoords } from "@abilities/abilities.types";

describe('Collisions', () => {
  let collisions: Collisions;

  beforeEach(() => {
    collisions = new Collisions();
  });

  it('should create an instance', () => {
    expect(collisions).toBeTruthy();
  });

  describe('hasCollision', () => {
    it('should return true if collision exists', () => {
      const rect1: TPixelsCoords = [0, 0, 10, 10];
      const rect2: TPixelsCoords = [5, 5, 10, 10];

      expect(collisions.hasCollision(rect1, rect2)).toBe(true);
    });

    it('should return false if no collision', () => {
      const rect1: TPixelsCoords = [0, 0, 10, 10];
      const rect2: TPixelsCoords = [20, 20, 10, 10];

      expect(collisions.hasCollision(rect1, rect2)).toBe(false);
    });
  });

  describe('preventBoundsDecorator', () => {
    let props: any;
    const characterMock = {
      moving: {
        getNextCollisionArea: jest.fn(),
      },
    };
    const otherCharacterMock = {
      moving: {
        getCollisionArea: jest.fn(),
      },
    };

    beforeEach(() => {
      characterMock.moving.getNextCollisionArea.mockReturnValue([20, 20, 10, 10]);
      otherCharacterMock.moving.getCollisionArea.mockReturnValue([0, 0, 10, 10]);

      props = {
        character: characterMock,
        otherCharacters$: of([otherCharacterMock]),
        bounds$: of([[0, 0, 10, 10]]),
        originalStream$: of(MovingDirection.RIGHT),
      };
    });

    afterEach(() => {
      characterMock.moving.getNextCollisionArea.mockClear();
      otherCharacterMock.moving.getCollisionArea.mockClear();
    });

    it('should return MovingDirection.IDLE when there is a collision with other characters', (done) => {
      otherCharacterMock.moving.getCollisionArea.mockReturnValue([20, 20, 10, 10]);
      collisions.preventBoundsDecorator(props).subscribe((response) => {
        expect(response).toEqual(MovingDirection.IDLE);
        done();
      });
    });

    it('should return MovingDirection.RIGHT when there is no collision with other characters', (done) => {
      otherCharacterMock.moving.getCollisionArea.mockReturnValue([30, 30, 10, 10]);

      collisions.preventBoundsDecorator(props).subscribe((response) => {
        expect(response).toEqual(MovingDirection.RIGHT);
        done();
      });
    });
  });
});
