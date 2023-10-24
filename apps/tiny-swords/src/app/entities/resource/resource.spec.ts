import { Resource } from './resource';
import { ResourcesType } from './resource.const';

describe('Resource', () => {
  let resource: Resource;

  beforeEach(() => {
    resource = new Resource({
      type: ResourcesType.GOLD,
      coords: [10, 20, 30, 40],
      quantity: 100,
    });
  });

  it('initializes with the correct props', () => {
    expect(resource.resourceType).toEqual(ResourcesType.GOLD);
    expect(resource.coords).toEqual([10, 20, 30, 40]);
    expect(resource.getQuantity()).toEqual(100);
    expect(resource.resourceImage).toEqual('./img/Resources/G_Idle.png');
  });

  it('changes the type correctly', () => {
    resource.setType(ResourcesType.WOOD);
    expect(resource.resourceType).toEqual(ResourcesType.WOOD);
    expect(resource.resourceImage).toEqual('./img/Resources/W_Idle.png');
  });

  it('adds to the quantity correctly', () => {
    resource.add(50);
    expect(resource.getQuantity()).toEqual(150);
  });

  it('subtracts from the quantity correctly', () => {
    resource.subtract(50);
    expect(resource.getQuantity()).toEqual(50);
  });

  it('throws an error if try to subtracts from the quantity more than available', () => {
    expect(() => resource.subtract(150)).toThrow('Insufficient quantity!');
  });
});
