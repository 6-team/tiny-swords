import { IPosition } from "./matrix.types";

export class Matrix<T> {
	#array: Array<T>;
	#xLength: number;

	constructor(xLength: number, yLength: number) {
		this.#array = new Array(xLength * yLength);
		this.#xLength = xLength;
	}

	#getElementIndex({ x, y }: IPosition) {
		return y * this.#xLength + x;
	}

	#assertInvalidPosition(index: number) {
		if (index >= this.#array.length || index < 0) {
			throw new Error('Invalid coordinates');
		}
	}

	set(position: IPosition, value: T) {
		const index = this.#getElementIndex(position);

		this.#assertInvalidPosition(index);
		this.#array[index] = value;
	}

	get(position: IPosition) {
		const index = this.#getElementIndex(position);

		this.#assertInvalidPosition(index);

		return this.#array[index];
	}

	get stringView() {
		const result = [];

		for (let index = 0; index < this.#array.length; index++) {
			const element = this.#array[index] || '_';

			if (index % this.#xLength === 0) {
				result.push([element]);
			} else {
				result[result.length - 1].push(element);
			}
		}

		return result.join('\n');
	}
}
