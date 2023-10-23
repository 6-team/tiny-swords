# Tools

Включает в себя следующие сущности:

- scheduleNextFrame
- Класс Matrix
- Класс Maybe
- Класс Nothing

---

## scheduleNextFrame()

`scheduleNextFrame()` - это функция, которая использует `setTimeout` и `requestAnimationFrame` для быстрого и эффективного планирования следующего анимационного кадра. 
Затем данный кадр передается в поток `frames$`

---

## Класс Matrix

`Matrix` - это класс, представляющий двумерную матрицу. Исльпользуется для хранения ячеек слоя карты.


### Пример использования

```typescript
import { Matrix, IPosition } from './Matrix';

const matrix = new Matrix<number>(3, 3);
const position: IPosition = { x: 1, y: 1 };

matrix.set(position, 5);

console.log(matrix.get(position)); // 5
console.log(matrix.stringView); // Выведет строковое представление матрицы
```
---

## Класс Maybe

Класс `Maybe` - это безопасный тип для необязательных значений. Он реализует концепцию из функционального программирования.

### Пример использования

```typescript
let maybeValue = new Maybe<number>(10);
let result = maybeValue
  .map((value) => value * 2)
  .map((value) => (value > 15 ? value : null))
  .extract();

console.log(result); // возвращает: null
```
---

## Класс Nothing

Класс служит обёрткой для безопасного обращения с отсутствующими значениями, избегая ошибок null или undefined.

## Как использовать

```typescript
import { Nothing } from '@tools'; // замените 'your-package' на имя вашего пакета

const wrappedData = new Nothing(5);
console.log(wrappedData.extract()); // Выводит: 5
```
