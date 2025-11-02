import { RecursiveBacktrackingGenerator } from '../RecursiveBacktracking';

describe('RecursiveBacktrackingGenerator', () => {
  let generator: RecursiveBacktrackingGenerator;

  beforeEach(() => {
    generator = new RecursiveBacktrackingGenerator();
  });

  test('generates a maze with correct dimensions', () => {
    const maze = generator.generate(10, 10);
    expect(maze.width).toBe(10);
    expect(maze.height).toBe(10);
    expect(maze.cells.length).toBe(10);
    expect(maze.cells[0].length).toBe(10);
  });

  test('sets start and end positions', () => {
    const maze = generator.generate(10, 10);
    expect(maze.start).toEqual({ row: 0, col: 0 });
    expect(maze.end).toEqual({ row: 9, col: 9 });
  });

  test('creates a valid maze with at least one path removed', () => {
    const maze = generator.generate(5, 5);
    let hasRemovedWall = false;

    for (let row = 0; row < maze.height; row++) {
      for (let col = 0; col < maze.width; col++) {
        const cell = maze.cells[row][col];
        if (!cell.walls.top || !cell.walls.right || !cell.walls.bottom || !cell.walls.left) {
          hasRemovedWall = true;
          break;
        }
      }
    }

    expect(hasRemovedWall).toBe(true);
  });

  test('marks all cells as visited', () => {
    const maze = generator.generate(5, 5);

    for (let row = 0; row < maze.height; row++) {
      for (let col = 0; col < maze.width; col++) {
        expect(maze.cells[row][col].visited).toBe(true);
      }
    }
  });

  test('generates different mazes on multiple calls', () => {
    const maze1 = generator.generate(10, 10);
    const maze2 = generator.generate(10, 10);

    let isDifferent = false;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell1 = maze1.cells[row][col];
        const cell2 = maze2.cells[row][col];

        if (JSON.stringify(cell1.walls) !== JSON.stringify(cell2.walls)) {
          isDifferent = true;
          break;
        }
      }
      if (isDifferent) break;
    }

    expect(isDifferent).toBe(true);
  });
});
