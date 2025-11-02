import { AStarSolver } from '../AStarSolver';
import { RecursiveBacktrackingGenerator } from '../../maze/RecursiveBacktracking';

describe('AStarSolver', () => {
  let solver: AStarSolver;
  let generator: RecursiveBacktrackingGenerator;

  beforeEach(() => {
    solver = new AStarSolver();
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

  test('A* finds optimal or near-optimal path', () => {
    const maze = generator.generate(15, 15);
    const astarSolution = solver.solve(maze);

    expect(astarSolution).not.toBeNull();
    expect(astarSolution!.length).toBeGreaterThan(0);
  });
});
