import { CharacterActionAnimation } from '../../entities/character';
import { AttackingForce } from '../../abilities/attacking/attacking.const';
import { Directions, movementSetters, pushedKeys } from './keyboard.conts';
import { SCALE } from '../../common/common.const';
import { IAttacking, IMovable, IWithAbilityToAttack, IWithAbilityToMove } from '../../abilities/abilities.types';
import { ICoordinateSystem, ITile } from '../../common/common.types';
import { IController } from '../controllers.types';

export default class KeyboardController implements IController {
  #pushedButtons: Directions[] = [];
  #isRightDirection = true;
  #movingProgressRemaining: number;
  #movable: IMovable;
  #attacking: IAttacking;
  #direction: Directions;
  #isCharacterMoving = false;

  constructor(
    protected readonly character: ITile & IWithAbilityToAttack & IWithAbilityToMove,
    protected readonly system: ICoordinateSystem,
  ) {
    this.#movable = character.getAbility('movable');
    this.#attacking = character.getAbility('attacking');
    this.#movingProgressRemaining = 0;
    this.#addListeners();
  }

  get pushedButton(): Directions {
    return this.#pushedButtons[0];
  }

  get isCharacterMoving(): boolean {
    return this.#isCharacterMoving;
  }

  get isRightDirection(): boolean {
    return this.#isRightDirection;
  }

  #move(code: string): void {
    const direction = pushedKeys[code];

    if (direction && this.#pushedButtons.indexOf(direction) === -1) {
      this.#pushedButtons.unshift(direction);

      if (direction === Directions.LEFT) {
        this.#isRightDirection = false;
      }

      if (direction === Directions.RIGHT) {
        this.#isRightDirection = true;
      }
    }
  }

  #stop(code: string): void {
    const direction = pushedKeys[code];
    const directionIdx = this.#pushedButtons.indexOf(direction);

    if (directionIdx > -1) {
      this.#pushedButtons.splice(directionIdx, 1);
    }
  }

  /**
   * Данный метод необходим для того, чтобы логика движения зависела от смены кадров для плавности
   */
  init(): void {
    if (this.#movingProgressRemaining > 0) {
      this.#movable.setMovement(movementSetters[this.#direction]);
      this.#movingProgressRemaining -= 1;
    }

    if (this.#movingProgressRemaining === 0 && this.pushedButton) {
      this.#isCharacterMoving = true;
      this.#movingProgressRemaining = this.system.tileSize * SCALE;
      this.#direction = this.pushedButton;
    }

    if (this.#movingProgressRemaining === 0 && !this.pushedButton) {
      this.#isCharacterMoving = false;
      this.character.setAnimation(
        this.isRightDirection ? CharacterActionAnimation.STANDS_STILL : CharacterActionAnimation.STANDS_STILL_LEFT,
      );
    }
  }

  #addListeners(): void {
    document.addEventListener('keydown', (event) => {
      this.#move(event.code);

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
          this.character.setAnimation(CharacterActionAnimation.RUN_LEFT);

          break;
        case 'ArrowRight':
        case 'd':
          this.character.setAnimation(CharacterActionAnimation.RUN);

          break;
        case 'ArrowUp':
        case 'w':
          this.character.setAnimation(
            this.isRightDirection ? CharacterActionAnimation.RUN : CharacterActionAnimation.RUN_LEFT,
          );

          break;
        case 'ArrowDown':
        case 's':
          this.character.setAnimation(
            this.isRightDirection ? CharacterActionAnimation.RUN : CharacterActionAnimation.RUN_LEFT,
          );

          break;
        case 'f':
          this.#attacking.attack();

          break;
        case 'g':
          this.#attacking.attack(AttackingForce.STRONG);

          break;
        default:
          return;
      }
    });

    document.addEventListener('keyup', (event) => {
      this.#stop(event.code);
    });
  }
}
