import { Maybe } from './maybe';

describe('Проверка монады Maybe', () => {
  it('mapper возвращает измененнное значение', () => {
    const mappedMaybe = new Maybe(0).map((value) => value + 1);
    expect(mappedMaybe.extract()).toBe(1);
  });
});
