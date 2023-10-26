import { AttackingType, MovingDirection } from '../enums';
import { Entity } from './entity';

describe('Entity', () => {
  it('should create an instance of Entity', () => {
    const entity = new Entity({
      id: 'test-id',
      coords: [1, 2],
      breakpoint: [3, 4],
      direction: MovingDirection.UP,
      attackingType: AttackingType.DOWN,
      isDied: false,
    });

    expect(entity).to.be.an.instanceOf(Entity);
    expect(entity.id).to.equal('test-id');
    expect(entity.coords).to.deep.equal([1, 2]);
    expect(entity.breakpoint).to.deep.equal([3, 4]);
    expect(entity.direction).to.equal(MovingDirection.UP);
    expect(entity.attackingType).to.equal(AttackingType.DOWN);
    expect(entity.isDied).to.equal(false);
  });

  it('should create an instance of Entity with default values', () => {
    const entity = new Entity({
      id: 'test-id',
    });

    expect(entity).to.be.an.instanceOf(Entity);
    expect(entity.id).to.equal('test-id');
    expect(entity.coords).to.be.undefined;
    expect(entity.breakpoint).to.be.undefined;
    expect(entity.direction).to.be.null;
    expect(entity.attackingType).to.be.null;
    expect(entity.isDied).to.equal(false);
  });
});
