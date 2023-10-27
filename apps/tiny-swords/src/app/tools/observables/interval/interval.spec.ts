import { createInterval } from './interval';

jest.useFakeTimers();

describe('createInterval', () => {
  it('should emit values every defined interval', () => {
    const mockNext = jest.fn();
    const observable = createInterval(1000);
    observable.subscribe({
      next: mockNext
    });

    expect(mockNext).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(mockNext).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(mockNext).toBeCalledTimes(2);
  });
});
