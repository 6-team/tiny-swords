import { BehaviorSubject } from 'rxjs';
import { Collecting } from './collecting';

describe('Collecting class', () => {
  let collecting: Collecting;

  beforeEach(() => {
    collecting = new Collecting();
  });

  it('should set context correctly', () => {
    const fakeContext: any = {
      isContext: true,
    };

    collecting.setContext(fakeContext);
    expect((collecting as any)._context).toEqual(fakeContext);
  });

  it('should add item to collection correctly', () => {
    jest.spyOn(BehaviorSubject.prototype, 'next');

    const fakeItem: any = {
      isResource: true,
    };

    collecting.collect(fakeItem);

    expect(BehaviorSubject.prototype.next).toHaveBeenCalledWith([fakeItem]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
