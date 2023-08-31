import { IPosition } from '../tools/matrix/matrix.types';
import { TileName } from '../entites/scene/scene.const';

const random = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min);

const SIZE_MAP = 15;
const SIZE_GAME_MIN = 10;
const SIZE_GAME_MAX = 13;
const SIZE_GAME_WIDTH = Math.floor(Math.random() * (SIZE_GAME_MAX - SIZE_GAME_MIN + 1) + SIZE_GAME_MIN);
const SIZE_GAME_HEIGHT = Math.floor(Math.random() * (SIZE_GAME_MAX - SIZE_GAME_MIN + 1) + SIZE_GAME_MIN);

enum LEVELS {
  WATER,
  SAND,
  ELEVATION,
  GROUND,
}

export interface ITile {
  position: IPosition;
  collision: boolean;
  tail: TileName;
}

export const get1Level = (): ITile[][][] => {
  const allTile: ITile[][] = [];
  const allTileLevel2: ITile[][] = [];
  const allTileLevel3: Record<string, ITile> = {};
  const allTileLevel4: ITile[][] = [];

  const setTile = ({ x, y, value, item }: { x: number; y: number; value: ITile; item: ITile[][] }) => {
    if (!item[x]) {
      item[x] = [];
      item[x][y] = { ...value };
    } else {
      item[x][y] = { ...value };
    }
  };

  const paddingsX = Math.floor((SIZE_MAP - SIZE_GAME_WIDTH) / 2);
  const paddingsY = Math.floor((SIZE_MAP - SIZE_GAME_HEIGHT) / 2);
  const poleEnd = SIZE_MAP - paddings;

  console.log(paddings, poleEnd);

  for (let x = 0; x < SIZE_MAP; x++) {
    for (let y = 0; y < SIZE_MAP + 2; y++) {
      if (x === paddings) {
        console.log(poleEnd);
        console.log(x, paddings - 1);
      }
      if (x + 2 < paddings || x >= poleEnd) {
        setTile({
          item: allTile,
          x,
          y,
          value: {
            position: {
              x,
              y,
            },
            tail: TileName.WATER_MIDDLE_MIDDLE,
            collision: true,
          },
        });
        continue;
      }

      if (x > paddings && y > paddings) {
        if (x >= poleEnd || y >= poleEnd) {
          setTile({
            item: allTile,
            x,
            y,
            value: {
              position: {
                x,
                y,
              },
              tail: TileName.WATER_MIDDLE_MIDDLE,
              collision: true,
            },
          });
          continue;
        }

        let level2 = 0;

        if (!level2) {
          setTile({
            item: allTile,
            x,
            y,
            value: {
              position: {
                x,
                y,
              },
              tail: TileName.ELEVATION_EDGE_LEFT,
              collision: false,
            },
          });

          level2++;
        } else {
          const check = SIZE_GAME % 2 ? level2 + 1 : level2 + 2;
          if (check % SIZE_GAME === 0) {
            setTile({
              item: allTile,
              x,
              y,
              value: {
                position: {
                  x,
                  y,
                },
                tail: TileName.ELEVATION_EDGE_RIGHT,
                collision: false,
              },
            });
            level2 = 0;
            continue;
          }

          setTile({
            item: allTile,
            x,
            y,
            value: {
              position: {
                x,
                y,
              },
              tail: TileName.ELEVATION_EDGE_MIDDLE,
              collision: false,
            },
          });
          level2++;
        }
      } else
        setTile({
          item: allTile,
          x,
          y,
          value: {
            position: {
              x,
              y,
            },
            tail: TileName.WATER_MIDDLE_MIDDLE,
            collision: true,
          },
        });
    }
  }

  return [allTile, allTileLevel2];
};
