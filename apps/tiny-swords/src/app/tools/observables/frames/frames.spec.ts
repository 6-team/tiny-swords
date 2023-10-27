import { scheduleNextFrame } from './frames';
import { Subject } from 'rxjs';

// Global mocks
global.Date.now = jest.fn();
(global.setTimeout as unknown as jest.Mock) = jest.fn();
global.requestAnimationFrame = jest.fn();

describe('testing scheduleNextFrame function', () => {
  let observable;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly schedule the next frame', (done) => {
    (Date.now as unknown as jest.Mock).mockImplementationOnce(() => 1000);

    (setTimeout as unknown as jest.Mock).mockImplementationOnce((callback, delay) => {
      expect(delay).toBe(17);
      callback();
    });

    (requestAnimationFrame as unknown as jest.Mock).mockImplementationOnce((callback) => {
      callback();
    });

    observable = new Subject<number>();

    const sub = observable.subscribe({
      next: (value) => {
        expect(value).toBe(1000);
        sub.unsubscribe();
        done();
      },
    });

    observable.next(1000);
    scheduleNextFrame();
  });
});
