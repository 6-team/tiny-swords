import { LayerCondition } from "@core/layer";
import { SpriteName } from "@core/renderer";
import { randomInteger } from "../../layers.utils";

export const leftGroundConditions = (startCoords: [number, number]): LayerCondition[] => {
  const [x, y] = startCoords;

  return [
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x + 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x + 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x + 1, y - 2],
    },
  ];
}

export const leftGroundBridgeConditions = (startCoords: [number, number]): LayerCondition[] => {
  const [x, y] = startCoords;

  return [
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y],
    },
    {
      sprite: SpriteName.BRIDGE_LEFT,
      coords: [x + 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_LEFT,
      coords: [x - 1, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_MIDDLE,
      coords: [x, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_RIGHT,
      coords: [x + 1, y - 2],
    },
  ];
}

export const rightGroundConditions = (endCoords: [number, number]): LayerCondition[] => {
  const [x, y] = endCoords;

  return [
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x - 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x - 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x - 1, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y - 2],
    },
  ];
}

export const rightGroundBridgeConditions = (endCoords: [number, number]): LayerCondition[] => {
  const [x, y] = endCoords;

  return [
    {
      sprite: SpriteName.BRIDGE_RIGHT,
      coords: [x - 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_LEFT,
      coords: [x - 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
      coords: [x, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_MIDDLE_RIGHT,
      coords: [x + 1, y - 1],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_LEFT,
      coords: [x - 1, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_MIDDLE,
      coords: [x, y - 2],
    },
    {
      sprite: SpriteName.ELEVATION_TOP_RIGHT,
      coords: [x + 1, y - 2],
    },
  ];
}

export const borderWaterConditions = (gridX, gridY, border): LayerCondition[] => {
  const conditions = [];

  for (let y = 0; y < gridY; y++) {
    for (let x = 0; x < gridX; x++) {
      if (
        x < border
        || y < border
        || x >= gridX - border
        || y >= gridY - border
       ) {
        conditions.push({
          sprite: SpriteName.WATER_MIDDLE_MIDDLE,
          coords: [x, y],
          boundary: true,
        });
      }
    }
  }

  return conditions;
}

export const centerBridgeConditions = (gridX, gridY): LayerCondition[] => {
  const centerX = Math.floor(gridX / 2);
  const centerY = Math.floor(gridY / 2);
  const x = randomInteger(centerX - 2, centerX + 1);
  const y = randomInteger(centerY - 1, centerY + 1);

  const conditions: LayerCondition[] = [];

  for (let i = 0; i < gridY; i++) {
    if (i === y) {
      conditions.push({
        sprite: SpriteName.BRIDGE_MIDDLE,
        coords: [x, y],
      });
    } else {
      conditions.push({
        sprite: SpriteName.WATER_MIDDLE_MIDDLE,
        coords: [x, i],
        boundary: true,
      });
    }
  }

  return conditions;
}

export const centerStonesConditions = (gridX, gridY, border): LayerCondition[] => {
  const centerX = Math.floor(gridX / 2);
  const x = randomInteger(centerX - 2, centerX + 2);

  const conditions: LayerCondition[] = [];

  for (let i = 0; i < gridY; i++) {
    if (i > border && i < gridY - border - 1) {
      conditions.push({
        sprite: SpriteName.ELEVATION_MIDDLE_MIDDLE,
        coords: [x, i],
        boundary: false,
      });
    }
  }

  return conditions;
}


