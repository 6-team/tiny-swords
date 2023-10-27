import { BridgeType } from './bridge.const';
import { BridgeTile } from './bridge';

describe('BridgeTile testing', () => {
  let bridgeTile: BridgeTile;

  beforeEach(() => {
    bridgeTile = new BridgeTile();
  });

  it('should create an instance', () => {
    expect(bridgeTile).toBeInstanceOf(BridgeTile);
  });

  it('should set bridge type to MIDDLE by default', () => {
    expect((bridgeTile as any)._type).toBe(BridgeType.MIDDLE);
  });

  it('should change bridge type when setType is called', () => {
    bridgeTile.setType(BridgeType.LEFT);
    expect((bridgeTile as any)._type).toBe(BridgeType.LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (bridgeTile as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([BridgeType.LEFT, BridgeType.MIDDLE, BridgeType.SHADOW, BridgeType.RIGHT]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
