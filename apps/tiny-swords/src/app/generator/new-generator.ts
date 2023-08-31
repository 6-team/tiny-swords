import { TileName } from '../entites/scene/scene.const';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

type VectorGame = boolean[][];

const SIZE_MAP = 15;
const SIZE_GAME_MIN = SIZE_MAP - 5;
const SIZE_GAME_MAX = SIZE_MAP - 2;

const SIZE_GAME_WIDTH = random(11, SIZE_GAME_MAX);
const SIZE_GAME_HEIGHT = random(7, 10);

const getPaddings = (size: number): number => {
  if (size % 2) return Math.ceil((SIZE_MAP - size) / 2);
  return Math.floor((SIZE_MAP - size) / 2);
};

const paddingWidth = getPaddings(SIZE_GAME_WIDTH);
const paddingHeight = getPaddings(SIZE_GAME_HEIGHT);

const paddingWidthIndex = paddingWidth - 1;
const paddingHeightIndex = paddingHeight - 1;
const endPoleBottom = SIZE_MAP - paddingHeight - 1;
const endPoleRight = SIZE_MAP - paddingWidth - 1;

const ledgeIndexStart = random(paddingWidthIndex + 1, paddingWidthIndex + 3);
const ledgeIndexEnd = random(ledgeIndexStart + 1, endPoleRight - 2);

const rangeLedge = [ledgeIndexStart, ledgeIndexEnd];

const ledgeIndexStartBottom = random(paddingWidthIndex + 1, paddingWidthIndex + 3);
const ledgeIndexEndBottom = random(ledgeIndexStart + 1, endPoleRight - 2);

const rangeLedgeBottom = [ledgeIndexStartBottom, ledgeIndexEndBottom];

console.log(ledgeIndexStart, 'ledgeIndex');
console.log(ledgeIndexEnd, 'ledgeIndexEnd');
console.log(rangeLedge, 'rangeLedge');

type Position = 'bottom' | 'top';

export const level1 = {};
export const level2 = {};
export const level3 = {};
export const level4 = {};
export const level5 = {};
export const level6 = {};

const setLevel = (x, y, level) => {
  const key = `${x}.${y}`;

  level[key] = { tail: TileName.WATER_MIDDLE_MIDDLE };
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
    setLevel(x, y, level1);

    if (x === endPoleBottom - 1) {
      level[key] = { tail: TileName.GROUND_BOTTOM_LEFT };
      return;
    }

    level[key] = { tail: TileName.GROUND_MIDDLE_LEFT };
    return;
  }

  if (y === endPoleRight && x > paddingWidth && x <= endPoleBottom - 1) {
    setLevel(x, y, level1);

    if (x === endPoleBottom - 1) {
      level[key] = { tail: TileName.GROUND_BOTTOM_RIGHT };
      return;
    }

    level[key] = { tail: TileName.GROUND_MIDDLE_RIGHT };
    return;
  }

  if (x === endPoleBottom - 1) {
    setLevel(x, y, level1);
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

export const generate = (): VectorGame => {
  const vectorGame: VectorGame = [];
  const [ledgeIndexStart, ledgeIndexEnd] = rangeLedge;
  const [ledgeIndexStartBottom, ledgeIndexEndBottom] = rangeLedgeBottom;

  console.log(SIZE_GAME_WIDTH, 'SIZE_GAME_WIDTH');
  console.log(SIZE_GAME_HEIGHT, 'SIZE_GAME_HEIGHT');

  console.log(endPoleBottom, 'endPoleBottom');
  console.log(endPoleRight, 'endPoleRight');

  const setValue = (x: number, y: number, value: boolean) => {
    if (!vectorGame[x]) {
      vectorGame[x] = [];
    }

    vectorGame[x][y] = value;
  };

  const setLedge = (position: Position, coordinate: { x; y }): boolean => {
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

  for (let x = 0; x < SIZE_MAP; x++) {
    for (let y = 0; y < SIZE_MAP; y++) {
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

  return vectorGame;
};
