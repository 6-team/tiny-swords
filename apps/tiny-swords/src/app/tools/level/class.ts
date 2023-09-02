import { ILevelPosition, ILevelTile } from './interface';
import { water } from '../../generator/data/base-position';
import { TileName } from '../../entites/scene/scene.const';

export class LevelTile implements ILevelTile {
  constructor(
    private _tailPosition: ILevelPosition = {
      position: { ...water.position },
    },
  ) {}

  get tailPosition() {
    return this._tailPosition.position;
  }

  get bottomLeft(): TileName {
    return this.tailPosition.bottomLeft;
  }

  get bottomMiddle(): TileName {
    return this.tailPosition.bottomMiddle;
  }

  get bottomRight(): TileName {
    return this.tailPosition.bottomRight;
  }

  get horizontalLeft(): TileName {
    return this.tailPosition.horizontalLeft;
  }

  get horizontalMiddle(): TileName {
    return this.tailPosition.horizontalMiddle;
  }

  get horizontalRight(): TileName {
    return this.tailPosition.horizontalRight;
  }

  get middleLeft(): TileName {
    return this.tailPosition.middleLeft;
  }

  get middleMiddle(): TileName {
    return this.tailPosition.middleMiddle;
  }

  get middleRight(): TileName {
    return this.tailPosition.middleRight;
  }

  get topLeft(): TileName {
    return this.tailPosition.topLeft;
  }

  get topMiddle(): TileName {
    return this.tailPosition.topMiddle;
  }

  get topRight(): TileName {
    return this.tailPosition.topRight;
  }

  get verticalLeft(): TileName {
    return this.tailPosition.verticalLeft;
  }

  get verticalMiddle(): TileName {
    return this.tailPosition.verticalMiddle;
  }

  get verticalRight(): TileName {
    return this.tailPosition.verticalRight;
  }

  get edgeLeft(): TileName {
    return this.tailPosition.edgeLeft;
  }
  get edgeMiddle(): TileName {
    return this.tailPosition.edgeMiddle;
  }
  get edgeRight(): TileName {
    return this.tailPosition.edgeRight;
  }
}
