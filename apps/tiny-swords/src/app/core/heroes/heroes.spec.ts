import { of } from 'rxjs';

import { IEntity } from '@shared';

import { Hero, HeroType } from '@entities/hero';

import { Heroes } from './heroes';

const mockBoundsObservable = of([]);
const mockEnemiesObservable = of([]);
const mockEntity = { id: 'hero1' };
const mockConnectedEntity: IEntity = { id: 'hero2', coords: [2, 2] };

jest.mock('@entities/hero', () => {
  return {
    Hero: jest.fn().mockImplementation((hero) => {
      return hero;
    }),
    HeroType: jest.fn().mockImplementation(() => {
      return HeroType;
    }),
  };
});

jest.mock('@controllers/keyboard', () => {
  return {
    KeyboardController: jest.fn().mockImplementation((controller) => {
      return controller;
    }),
  };
});

jest.mock('@controllers/server', () => {
  return {
    ServerController: jest.fn().mockImplementation((controller) => {
      return controller;
    }),
  };
});

jest.mock('@controllers/mouse', () => {
  return {
    MouseController: jest.fn().mockImplementation((controller) => {
      return controller;
    }),
  };
});

describe('Heroes', () => {
  let heroes: Heroes;

  beforeEach(() => {
    heroes = new Heroes([1, 1]);
  });

  it('should create an instance of Heroes', () => {
    expect(heroes).toBeInstanceOf(Heroes);
  });

  describe('initHero', () => {
    it('should initialize a hero character and add it to the collection', () => {
      const hero = heroes.initHero(mockEntity, mockBoundsObservable, mockEnemiesObservable);

      expect(hero).toBeDefined();
      expect(heroes.heroes).toContain(hero);
    });
  });

  describe('initConnectedHero', () => {
    it('should initialize a connected hero character and add it to the collection', () => {
      const hero = heroes.initConnectedHero(mockConnectedEntity);

      expect(hero).toBeDefined();
      expect(heroes.heroes).toContain(hero);
    });
  });

  describe('addHero', () => {
    it('should add a hero character to the collection', () => {
      const hero = { id: 'hero3', coords: [0, 0] } as unknown as Hero;

      heroes.addHero(hero);

      expect(heroes.heroes).toContain(hero);
    });
  });

  describe('removeHero', () => {
    it('should remove a hero character from the collection', () => {
      const hero = heroes.initHero(mockEntity, mockBoundsObservable, mockEnemiesObservable);

      heroes.removeHero(hero.id);

      expect(heroes.heroes).not.toContain(hero);
    });
  });

  describe('getHero', () => {
    it('should retrieve a hero character from the collection by ID', () => {
      const hero = heroes.initHero(mockEntity, mockBoundsObservable, mockEnemiesObservable);
      const retrievedHero = heroes.getHero(hero.id);

      expect(retrievedHero).toBe(hero);
    });

    it('should return undefined when trying to get a non-existent hero', () => {
      const retrievedHero = heroes.getHero('nonExistentID');

      expect(retrievedHero).toBeUndefined();
    });
  });
});
