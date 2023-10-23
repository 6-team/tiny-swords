import { Matrix } from "@tools";

describe('Matrix', () => {
  const xLength = 3;
  const yLength = 3;
  let matrix: Matrix<number>;

  beforeEach(() => {
    matrix = new Matrix<number>(xLength, yLength);
  });

  it('should initialize with the correct size', () => {
    expect(matrix.array).toHaveLength(xLength * yLength);
  });

  it('should throw an error for invalid position', () => {
    expect(() => matrix.set({ x: xLength, y: yLength }, 1)).toThrow('Invalid coordinates');
    expect(() => matrix.get({ x: xLength, y: yLength })).toThrow('Invalid coordinates');
  });

  it('should correctly set and retrieve elements', () => {
    const position = { x: 1, y: 1 };
    const value = 5;

    matrix.set(position, value);

    expect(matrix.get(position)).toEqual(value);
  });

  it('should provide a correct string view', () => {
    const value = 5;
    matrix.set({ x: 0, y: 0 }, value);

    const stringView = matrix.stringView.split('\n'); // parse string view into 2D array
    const parsedView = stringView.map(row => row.split(','));

    expect(parsedView[0][0]).toEqual(value.toString());
    expect(parsedView[0][1]).toEqual('_');
    expect(parsedView[1][0]).toEqual('_');
  });
});
