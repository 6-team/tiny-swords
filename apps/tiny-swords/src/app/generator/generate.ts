import { TileName } from '../entites/scene/scene.const';
import { DecoType } from '../entites/deco/deco.const';
import { PositionLedge } from '../tools/level';
import { random } from '../tools/random';
import { map } from '../tools/map';
import { VectorGame } from '../tools/map/interface';
import { Level1 } from '../tools/level/strategy/level1';
import { levelTiles } from '../tools/level/level-tiles';
import { levelBuilder } from '../tools/level';
import { Level2 } from '../tools/level/strategy/level2';
import { Level3, Level4 } from '../tools/level/strategy';

const {
  gameHeight,
  gameWidth,
  endPoleRight,
  paddingWidth,
  paddingHeight,
  paddingWidthIndex,
  paddingHeightIndex,
  endPoleBottom,
  rangeLedge,
  rangeLedgeBottom,
  sizeMap,
} = map;

export let level1 = {};
export let level2 = {};
export let level3 = {};
export let level4 = {};
export let level5 = {};
export let level6 = {};
export let level7 = {};
export let bridgeLevel = {};

const resetLevels = () => {
  level1 = {};
  level2 = {};
  level3 = {};
  level4 = {};
  level5 = {};
  level6 = {};
  level7 = {};
  bridgeLevel = {};
};

const setLevel = (x, y, level, tile?: TileName) => {
  const key = `${x}.${y}`;

  level[key] = { tail: tile ? tile : levelTiles.level1Tile.middleMiddle };
  // level[key] = { tail: TileName.GROUND_TOP_LEFT };
};

const setLevel2 = (x, y, level, end = false) => {
  const key = `${x}.${y}`;

  if (!Object.keys(level).length) {
    level[key] = { tail: TileName.SAND_TOP_LEFT };
    return;
  }

  if (y === paddingWidthIndex) {
    level[key] = { tail: TileName.SAND_MIDDLE_LEFT };

    if (x === endPoleBottom + 1 && y === paddingWidthIndex) {
      level[key] = { tail: TileName.SAND_BOTTOM_LEFT };
      return;
    }

    return;
  } else {
    if (y >= paddingWidthIndex + 1 && y <= endPoleRight) {
      level[key] = { tail: TileName.SAND_BOTTOM_MIDDLE };
      return;
    }

    if (x === paddingHeight + 1) {
      level[key] = { tail: TileName.SAND_TOP_RIGHT };
      return;
    }
  }

  if (y === endPoleRight + 1) {
    level[key] = { tail: TileName.SAND_MIDDLE_RIGHT };

    if (x === endPoleBottom + 1) {
      level[key] = { tail: TileName.SAND_BOTTOM_RIGHT };
      return;
    }
  }
};

const setLevel3 = (x, y, level, end = false) => {
  const key = `${x}.${y}`;

  if (!Object.keys(level).length) {
    level[key] = { tail: TileName.GROUND_TOP_LEFT };
  } else {
    level[key] = { tail: !end ? TileName.GROUND_TOP_MIDDLE : TileName.GROUND_TOP_RIGHT };
  }
};

const setLevel3Bottom = (x, y, level, end = false) => {
  const key = `${x}.${y}`;

  if (!Object.keys(level).length) {
    level[key] = { tail: TileName.ELEVATION_EDGE_LEFT };
  } else {
    level[key] = { tail: !end ? TileName.ELEVATION_EDGE_MIDDLE : TileName.ELEVATION_EDGE_RIGHT };
  }
};

const setLevel5 = (x, y, level, end = false) => {
  const key = `${x}.${y}`;

  // { tail: !end ? TileName.GROUND_MIDDLE_MIDDLE : TileName.GROUND_TOP_LEFT };
  // console.log(x, y, paddingWidth, paddingHeight);
  if (x === paddingWidth && y === paddingHeight) {
    level[key] = { tail: TileName.GROUND_TOP_LEFT };
    return;
  } else if (x === paddingWidth) {
    if (y === endPoleRight) {
      level[key] = { tail: TileName.GROUND_TOP_RIGHT };
      return;
    }

    level[key] = { tail: TileName.GROUND_TOP_MIDDLE };
    return;
  }

  if (x > paddingHeight && y === paddingWidth && x <= endPoleBottom - 1) {
    setLevel(x, y, level1, TileName.SAND_MIDDLE_MIDDLE);

    if (x === endPoleBottom - 1) {
      level[key] = { tail: TileName.GROUND_BOTTOM_LEFT };
      return;
    }

    level[key] = { tail: TileName.GROUND_MIDDLE_LEFT };
    return;
  }

  if (y === endPoleRight && x > paddingWidth && x <= endPoleBottom - 1) {
    setLevel(x, y, level1, TileName.SAND_MIDDLE_MIDDLE);

    if (x === endPoleBottom - 1) {
      level[key] = { tail: TileName.GROUND_BOTTOM_RIGHT };
      return;
    }

    level[key] = { tail: TileName.GROUND_MIDDLE_RIGHT };
    return;
  }

  if (x === endPoleBottom - 1) {
    setLevel(x, y, level1, TileName.SAND_MIDDLE_MIDDLE);
    level[key] = { tail: TileName.GROUND_BOTTOM_MIDDLE };
    return;
  }

  if (x === endPoleBottom) {
    return;
  }

  level[key] = { tail: TileName.GROUND_MIDDLE_MIDDLE };
};

const setLevel6 = (x, y, level, end = false) => {
  const key = `${x}.${y}`;
  setLevel(x, y, level1);

  if (!Object.keys(level).length) {
    level[key] = { tail: TileName.ELEVATION_EDGE_LEFT };
  } else if (y === endPoleBottom) {
    level[key] = { tail: TileName.ELEVATION_EDGE_RIGHT };
  } else {
    level[key] = { tail: TileName.ELEVATION_EDGE_MIDDLE };
  }
};

const setLevelDecorators = (x, y) => {
  const key = `${x}.${y}`;

  if (!Object.keys(level7).length) {
    level7[key] = { tail: DecoType.MUSHROOM_L };
  } else {
    level7[key] = { tail: DecoType.STONE_L };
  }
};

const generateDecorations = (map: VectorGame) => {
  const rangeWidth = gameWidth % 2 ? paddingWidth + gameWidth + 1 : paddingWidth + gameWidth + 2;
  const rangeHeight = paddingHeight + gameHeight + 2;
  const [width, height] = [random(paddingWidth + 2, rangeWidth), random(paddingHeight + 2, rangeHeight)];

  // console.log(width, height);
  if (map[height][width]) {
    setLevelDecorators(height, width);
    map[height][width] = false;
    return;
  } else {
    return generateDecorations(map);
  }
};

const generateBridge = (vectorGame) => {
  const coordinatesLeft = random(paddingHeight + 1, gameHeight);

  if (paddingWidth === 1) {
    const [xLineLeft, xLineRight] = [coordinatesLeft, random(coordinatesLeft, gameHeight + 2)];
    const endIndexLine = sizeMap - 1;

    vectorGame[xLineLeft][0] = true;
    vectorGame[xLineLeft][1] = true;
    vectorGame[xLineRight][endIndexLine] = true;
    vectorGame[xLineRight][endIndexLine - 1] = true;

    setLevel(xLineLeft, 0, bridgeLevel, TileName.BRIDGE_MIDDLE);
    setLevel(xLineLeft, 1, bridgeLevel, TileName.BRIDGE_RIGHT);

    setLevel(xLineRight, endIndexLine, bridgeLevel, TileName.BRIDGE_MIDDLE);
    setLevel(xLineRight, endIndexLine - 1, bridgeLevel, TileName.BRIDGE_LEFT);
  } else {
    const [xLineLeft, xLineRight] = [coordinatesLeft, random(coordinatesLeft, gameHeight + 2)];
    const endIndexLine = sizeMap - 1;

    for (let i = 0; i <= paddingWidth; i++) {
      let tileLeft = TileName.BRIDGE_MIDDLE;
      let tileRight = TileName.BRIDGE_MIDDLE;
      if (i === paddingWidth) {
        tileLeft = TileName.BRIDGE_RIGHT;
        tileRight = TileName.BRIDGE_LEFT;
      }

      setLevel(xLineLeft, i, bridgeLevel, tileLeft);
      setLevel(xLineLeft, endIndexLine - i, bridgeLevel, tileRight);
    }
  }
};

export const generate = (): VectorGame => {
  resetLevels();
  const vectorGame: VectorGame = [];
  const [ledgeIndexStart, ledgeIndexEnd] = rangeLedge;
  const [ledgeIndexStartBottom, ledgeIndexEndBottom] = rangeLedgeBottom;

  const setValue = (x: number, y: number, value: boolean) => {
    if (!vectorGame[x]) {
      vectorGame[x] = [];
    }

    vectorGame[x][y] = value;
  };

  const setLedge = (position: PositionLedge, coordinate: { x; y }): boolean => {
    const { x, y } = coordinate;

    switch (position) {
      case 'top':
        if (x === paddingHeightIndex && y >= ledgeIndexStart && y <= ledgeIndexEnd) {
          setValue(x, y, true);
          setLevel(x, y, level1);
          setLevel3(x, y, level3, y === ledgeIndexEnd);
          return true;
        }
        break;
      case 'bottom':
        if (x === endPoleBottom + 1 && y >= ledgeIndexStartBottom && y <= ledgeIndexEndBottom) {
          setValue(x, y, true);
          setLevel3Bottom(x, y, level4, y === ledgeIndexEndBottom);
          setLevel(x, y, level1);
          return true;
        }
        break;
      default:
        break;
    }
    return false;
  };

  for (let x = 0; x < sizeMap; x++) {
    for (let y = 0; y < sizeMap; y++) {
      // if (setLedge('top', { x, y })) continue;
      // if (setLedge('bottom', { x, y })) continue;

      // если X равен верхнему падингу и Y равен левому падингу тогда добавляем в level1 траву

      if (
        (x > paddingHeightIndex + 1 && x <= endPoleBottom + 1 && y === paddingWidthIndex) ||
        x === endPoleBottom + 1 ||
        (y === endPoleRight + 1 && x > paddingHeightIndex + 1 && x <= endPoleBottom)
      ) {
        setLevel2(x, y, level2);
      }

      if (x > paddingHeightIndex && y > paddingWidthIndex) {
        if (x === paddingWidthIndex + 1 && y >= paddingWidthIndex + 1) {
          setLevel(x, y, level1);
        }

        if (x > endPoleBottom || y > endPoleRight) {
          setValue(x, y, false);
          setLevel(x, y, level1);
          continue;
        }

        if (x === endPoleBottom) {
          setLevel6(x, y, level6);
          setValue(x, y, true);
          continue;
        }

        setValue(x, y, true);
        setLevel5(x, y, level5);
      } else {
        setLevel(x, y, level1);
        setValue(x, y, false);
      }
    }
  }

  const l1 = levelBuilder(new Level1(vectorGame, map, levelTiles));
  const l2 = levelBuilder(new Level2(vectorGame, map, levelTiles));
  const l3 = levelBuilder(new Level3(vectorGame, map, levelTiles));
  const l4 = levelBuilder(new Level4(vectorGame, map, levelTiles));

  l1.setTiles();
  l2.setTiles();
  l3.setTiles();
  l4.setTiles();

  level1 = l1.coordinates;
  level2 = l2.coordinates;
  level3 = l3.coordinates;
  level4 = l4.coordinates;

  for (const el of new Array(5)) {
    generateDecorations(vectorGame);
  }

  generateBridge(vectorGame);

  return vectorGame;
};
