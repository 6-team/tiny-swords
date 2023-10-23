import { Maybe, Nothing } from "@tools";

describe('Maybe monad', () => {
  it('should map correctly', () => {
    const maybeA = new Maybe(5);
    const mappedA = maybeA.map((prev) => prev * 2);
    expect(mappedA.extract()).toBe(10);

    const mappedToNothing = maybeA.map((_) => null);
    expect(mappedToNothing).toBeInstanceOf(Nothing);
  });

  it('should extract correctly', () => {
    const maybeA = new Maybe(5);
    expect(maybeA.extract()).toBe(5);
  });
});
