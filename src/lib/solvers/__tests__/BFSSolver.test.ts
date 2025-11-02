import { BFSSolver } from '../BFSSolver';
import { RecursiveBacktrackingGenerator } from '../../maze/RecursiveBacktracking';
import { Maze } from '@/types/maze';

describe('BFSSolver', () => {
  let solver: BFSSolver;
  let generator: RecursiveBacktrackingGenerator;

  beforeEach(() => {
    solver = new BFSSolver();
    generator = new RecursiveBacktrackingGenerator();
  });

  test('finds a solution for a generated maze', () => {
    const maze = generator.generate(10, 10);
    const solution = solver.solve(maze);

    expect(solution).not.toBeNull();
    expect(solution!.length).toBeGreaterThan(0);
  });

  test('solution starts at maze start', () => {
    const maze = generator.generate(10, 10);
    const solution = solver.solve(maze);

    expect(solution).not.toBeNull();
    expect(solution![0]).toEqual(maze.start);
  });

  test('solution ends at maze end', () => {
    const maze = generator.generate(10, 10);
    const solution = solver.solve(maze);

    expect(solution).not.toBeNull();
    const lastStep = solution![solution!.length - 1];
    expect(lastStep).toEqual(maze.end);
  });

  test('solution contains valid consecutive steps', () => {
    const maze = generator.generate(10, 10);
    const solution = solver.solve(maze);

    expect(solution).not.toBeNull();

    for (let i = 0; i < solution!.length - 1; i++) {
      const current = solution![i];
      const next = solution![i + 1];

      const rowDiff = Math.abs(current.row - next.row);
      const colDiff = Math.abs(current.col - next.col);

      expect(rowDiff + colDiff).toBe(1);
    }
  });

  test('finds shortest path', () => {
    const maze: Maze = {
      width: 3,
      height: 3,
      start: { row: 0, col: 0 },
      end: { row: 2, col: 2 },
      cells: [
        [
          { row: 0, col: 0, walls: { top: true, right: false, bottom: false, left: true }, visited: true },
          { row: 0, col: 1, walls: { top: true, right: false, bottom: true, left: false }, visited: true },
          { row: 0, col: 2, walls: { top: true, right: true, bottom: false, left: false }, visited: true },
        ],
        [
          { row: 1, col: 0, walls: { top: false, right: true, bottom: false, left: true }, visited: true },
          { row: 1, col: 1, walls: { top: true, right: true, bottom: true, left: true }, visited: true },
          { row: 1, col: 2, walls: { top: false, right: true, bottom: false, left: true }, visited: true },
        ],
        [
          { row: 2, col: 0, walls: { top: false, right: false, bottom: true, left: true }, visited: true },
          { row: 2, col: 1, walls: { top: true, right: false, bottom: true, left: false }, visited: true },
          { row: 2, col: 2, walls: { top: false, right: true, bottom: true, left: false }, visited: true },
        ],
      ],
    };

    const solution = solver.solve(maze);
    expect(solution).not.toBeNull();
    expect(solution!.length).toBe(5);
  });
});
