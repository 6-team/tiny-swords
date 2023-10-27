import Character from './character';
import { CoordsTuple } from '@entities/tile';

class TestCharacter extends Character<string, { movable: { setContext: () => void } }> {
  protected _type: string;
  protected _sprite: string;
  protected _getCoordsMap(): Record<string, CoordsTuple> {
    throw new Error('Method not implemented.');
  }
}

describe('Character class', () => {
  let character: TestCharacter;

  const mockAbilities = {
    movable: {
      setContext: jest.fn(),
    },
  };

  beforeEach(() => {
    character = new TestCharacter({ id: '1' });
    (character as any)._setAbilities(mockAbilities);
  });

  test('should instantiate with correct id', () => {
    expect(character.id).toBe('1');
  });

  test('should set abilities correctly', () => {
    for (const ability in mockAbilities) {
      expect(mockAbilities[ability].setContext).toHaveBeenCalledWith(character);
    }
  });

  test('getAbility should return correct ability', () => {
    const returnedAbility = character.getAbility<'movable'>('movable');
    expect(returnedAbility).toEqual(mockAbilities['movable']);
  });
});
