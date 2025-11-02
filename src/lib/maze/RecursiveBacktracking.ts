import { MazeGenerator, Maze, Cell } from '@/types/maze';
import { MazeBase } from './MazeBase';

export class RecursiveBacktrackingGenerator extends MazeBase implements MazeGenerator {
  name = 'Recursive Backtracking';
  description = 'Classic DFS-based algorithm that creates perfect mazes with long winding passages';

  generate(width: number, height: number): Maze {
    const maze = this.createEmptyMaze(width, height);
    const stack: Cell[] = [];
    const startCell = maze.cells[0][0];

    startCell.visited = true;
    stack.push(startCell);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const unvisitedNeighbors = this.getNeighbors(maze, current.row, current.col)
        .filter(neighbor => !neighbor.visited);

      if (unvisitedNeighbors.length > 0) {
        const next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.removeWall(current, next);
        next.visited = true;
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    return maze;
  }
}
