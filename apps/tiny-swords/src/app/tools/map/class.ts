import { random } from '../random';
import { SIZE_GAME_MAX, SIZE_GAME_MIN, SIZE_MAP } from './settings';

export class Map {
  constructor(public gameWidth?: number, public gameHeight?: number) {}

  get sizeMap(): number {
    return SIZE_MAP;
  }

  get paddingWidth(): number {
    return this.getPaddings(this.gameWidth);
  }

  get paddingHeight(): number {
    return this.getPaddings(this.gameHeight);
  }

  get paddingWidthIndex(): number {
    return this.paddingWidth - 1;
  }

  get paddingHeightIndex(): number {
    return this.paddingHeight - 1;
  }

  get endPoleBottom(): number {
    return this.sizeMap - this.paddingHeight - 1;
  }
  get endPoleRight(): number {
    return this.sizeMap - this.paddingWidth - 1;
  }

  get rangeLedge(): number[] {
    return [this.ledgeIndexStart, this.ledgeIndexEnd];
  }

  get rangeLedgeBottom(): number[] {
    return [this.ledgeIndexStartBottom, this.ledgeIndexEndBottom];
  }

  private getPaddings(size: number): number {
    if (size % 2) return Math.ceil((this.sizeMap - size) / 2);
    return Math.floor((this.sizeMap - size) / 2);
  }

  private get ledgeIndexStartBottom(): number {
    return random(this.paddingWidthIndex + 1, this.paddingWidthIndex + 3);
  }

  private get ledgeIndexEndBottom(): number {
    return random(this.ledgeIndexStart + 1, this.endPoleRight - 2);
  }

  private get ledgeIndexStart(): number {
    return random(this.paddingWidthIndex + 1, this.paddingWidthIndex + 3);
  }

  private get ledgeIndexEnd(): number {
    return random(this.ledgeIndexStart + 1, this.endPoleRight - 2);
  }
}

export const map = new Map(random(SIZE_GAME_MIN, SIZE_GAME_MAX), random(7, 10));
