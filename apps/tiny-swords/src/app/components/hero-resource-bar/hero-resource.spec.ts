import { HeroResourcesBar } from './hero-resource-bar';
import { ResourcesType } from '@entities/resource';
import { Resource } from '@entities/resource/resource';
import { quantityResources } from './hero-resource-bar.const';

describe('Hero Resources Bar', () => {
  let heroResourcesBar: HeroResourcesBar;
  let mockResources: Resource[];

  beforeEach(() => {
    mockResources = [
      new Resource({ type: ResourcesType.GOLD, quantity: 100 }),
      new Resource({ type: ResourcesType.WOOD, quantity: 100 }),
    ];
    heroResourcesBar = new HeroResourcesBar(mockResources);
  });

  test('should correctly initialize', () => {
    expect(heroResourcesBar.getResources().length).toBe(2);
    expect(heroResourcesBar.getResources()).toEqual(mockResources);
  });

  test('getResource should return correct resource for type', () => {
    const resource = heroResourcesBar.getResource(ResourcesType.GOLD);
    expect(resource).toEqual(new Resource({ type: ResourcesType.GOLD, quantity: 100 }));
  });

  test('addResource should correctly add to resource', () => {
    heroResourcesBar.addResource(ResourcesType.GOLD);
    const resource = heroResourcesBar.getResource(ResourcesType.GOLD);
    expect(resource.getQuantity()).toBe(100 + quantityResources[ResourcesType.GOLD]);
  });

  test('availableResourcesCheck should return true if enough resources', () => {
    const check = heroResourcesBar.availableResourcesCheck({ type: ResourcesType.GOLD, price: 50 });
    expect(check).toBe(true);
  });

  test('availableResourcesCheck should return false if not enough resources', () => {
    const check = heroResourcesBar.availableResourcesCheck({ type: ResourcesType.GOLD, price: 200 });
    expect(check).toBe(false);
  });

  test('spend should subtract resources correctly', () => {
    heroResourcesBar.spend({ type: ResourcesType.GOLD, price: 50 });
    expect(heroResourcesBar.getResource(ResourcesType.GOLD).getQuantity()).toBe(50);
  });

  test('spend should not subtract more resources than available', () => {
    heroResourcesBar.spend({ type: ResourcesType.GOLD, price: 200 });
    expect(heroResourcesBar.getResource(ResourcesType.GOLD).getQuantity()).toBe(100);
  });
});
