import { BridgeType } from './bridge.const';
import { BridgeSprite } from './bridge';

describe('BridgeSprite testing', () => {
  let bridgeSprite: BridgeSprite;

  beforeEach(() => {
    bridgeSprite = new BridgeSprite();
  });

  it('should create an instance', () => {
    expect(bridgeSprite).toBeInstanceOf(BridgeSprite);
  });

  it('should set bridge type to MIDDLE by default', () => {
    expect((bridgeSprite as any)._type).toBe(BridgeType.MIDDLE);
  });

  it('should change bridge type when setType is called', () => {
    bridgeSprite.setType(BridgeType.LEFT);
    expect((bridgeSprite as any)._type).toBe(BridgeType.LEFT);
  });

  it('should have a valid coordinates map', () => {
    const coordsMap = (bridgeSprite as any)._getCoordsMap();
    expect(coordsMap).toBeDefined();
    expect(coordsMap).toBeInstanceOf(Object);
    Object.values([BridgeType.LEFT, BridgeType.MIDDLE, BridgeType.SHADOW, BridgeType.RIGHT]).forEach((type) => {
      expect(coordsMap[type]).toBeDefined();
    });
  });
});
