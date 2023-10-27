import { Level } from './level';
import { LayersMap } from '@core/layers';
import { ILevelData } from '@shared';
import { Resource, ResourcesType } from '@entities/resource';

describe('Level class functionality', () => {
  let level: Level;
  let mockData: ILevelData<LayersMap, Resource>;

  beforeEach(() => {
    mockData = {
      gridX: 5,
      gridY: 5,
      startCoords: [1, 1],
      endCoords: [3, 3],
      maps: [],
      boundaries: [],
      resources: [new Resource({ type: ResourcesType.GOLD })],
      enemies: [[1, 2]],
    };

    level = new Level();
  });

  it('should update level correctly', () => {
    level.updateLevel(mockData);
    expect(level.data).toEqual(mockData);
    expect(level.gridX).toEqual(mockData.gridX);
    expect(level.gridY).toEqual(mockData.gridY);
  });

  it('should update resources correctly', () => {
    const newResources = [new Resource({ type: ResourcesType.MEAT }), new Resource({ type: ResourcesType.GOLD })]; // adjust to your Resource
    level.updateResources(newResources);
    expect(level.resources).toEqual(newResources);
  });

  it('should return next level data correctly', (done) => {
    level.next().subscribe((data) => {
      expect(data).toBeInstanceOf(Object);
      done();
    });
  });
});
