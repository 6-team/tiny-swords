import { KeyboardController } from '../../controllers/keyboard';
import { ServerController } from '../../controllers/server';
import { Hero } from '../../entities/hero';
import { grid64 } from '../grid';
import { IController } from '../../controllers';

import { IPlayer } from '@shared';
import { BehaviorSubject } from 'rxjs';

export class Heroes {
  readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);

  readonly heroes$ = this.#heroesSubject.asObservable();

  get heroes(): Hero[] {
    return this.#heroesSubject.getValue();
  }

  initHero(player: IPlayer): Hero {
    return this.#initDefaultHero(player, new KeyboardController());
  }

  initConnectedHero(player: IPlayer): Hero {
    return this.#initDefaultHero(player, new ServerController());
  }

  addHero(hero: Hero): void {
    const heroes = this.heroes.concat(hero);

    this.#heroesSubject.next(heroes);
  }

  getHero(player: IPlayer): Hero | undefined {
    return this.heroes.find(({ id }) => player.id === id);
  }

  #initDefaultHero({ id }: IPlayer, controller: IController): Hero {
    const [initialX, initialY, height, width] = grid64.transformToPixels(7, 4, 3, 3);
    const hero = new Hero({ controller, initialX, initialY, height, width, id });

    this.addHero(hero);

    return hero;
  }
}
