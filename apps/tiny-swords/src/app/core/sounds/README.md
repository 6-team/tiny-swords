# Sounds

## Классы для работы со звуками

## Sounds

---

Класс с базовыми методами для воспроизведения звуков

Использование

```ts
import { Sounds } from '@core/sounds';

const sounds = new Sounds();
sounds.addSound('game_sound', './path_to_sound/soun.wav');
sounds.playSound('game_sound', 0.5);
```

## HeroSounds

---

Класс для работы со звуками главного героя.
Для работы нужно при вызове конструктора передать экземпляры классов Movable, Attacking, Collecting

Использование

```ts
import { HeroSounds } from '@core/sounds';
const sounds = new HeroSounds({ movable, attacking, collecting });
```

## EnemySound

---

Класс для работы со звуками врагов.
Для работы нужно при вызове конструктора передать экземпляр классов Attacking

Использование

```ts
import { EnemySound } from '@core/sounds';
const sounds = new EnemySound({ movable, attacking, collecting });
```
