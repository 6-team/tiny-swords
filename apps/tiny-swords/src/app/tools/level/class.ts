import { ILevelPosition, ILevelTile } from './interface';
import { water } from '../../generator/data/base-position';
import { TileName } from '../../entites/scene/scene.const';

export class LevelTile implements ILevelTile {
  constructor(
    private _tailMiddleMiddle: ILevelPosition = {
      position: { ...water.position },
    },
  ) {}

  get tailMiddleMiddle() {
    return this._tailMiddleMiddle;
  }

  get bottomLeft(): TileName {
    return this.tailMiddleMiddle.position.bottomLeft;
  }

  get bottomMiddle(): TileName {
    return this.tailMiddleMiddle.position.bottomMiddle;
  }

  get bottomRight(): TileName {
    return this.tailMiddleMiddle.position.bottomRight;
  }

  get horizontalLeft(): TileName {
    return this.tailMiddleMiddle.position.horizontalLeft;
  }

  get horizontalMiddle(): TileName {
    return this.tailMiddleMiddle.position.horizontalMiddle;
  }

  get horizontalRight(): TileName {
    return this.tailMiddleMiddle.position.horizontalRight;
  }

  get middleLeft(): TileName {
    return this.tailMiddleMiddle.position.middleLeft;
  }

  get middleMiddle(): TileName {
    return this.tailMiddleMiddle.position.middleMiddle;
  }

  get middleRight(): TileName {
    return this.tailMiddleMiddle.position.middleRight;
  }

  get topLeft(): TileName {
    return this.tailMiddleMiddle.position.topLeft;
  }

  get topMiddle(): TileName {
    return this.tailMiddleMiddle.position.topMiddle;
  }

  get topRight(): TileName {
    return this.tailMiddleMiddle.position.topRight;
  }

  get verticalLeft(): TileName {
    return this.tailMiddleMiddle.position.verticalLeft;
  }

  get verticalMiddle(): TileName {
    return this.tailMiddleMiddle.position.verticalMiddle;
  }

  get verticalRight(): TileName {
    return this.tailMiddleMiddle.position.verticalRight;
  }

  get edgeLeft(): TileName {
    return this.tailMiddleMiddle.position.edgeLeft;
  }
  get edgeMiddle(): TileName {
    return this.tailMiddleMiddle.position.edgeMiddle;
  }
  get edgeRight(): TileName {
    return this.tailMiddleMiddle.position.edgeRight;
  }
}
