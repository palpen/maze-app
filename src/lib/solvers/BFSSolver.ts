import { MazeSolver, Maze } from '@/types/maze';

export class BFSSolver implements MazeSolver {
  name = 'Breadth-First Search';
  description = 'Explores all paths equally, guaranteed to find the shortest path';

  solve(maze: Maze): { row: number; col: number }[] | null {
    const queue: Array<{ row: number; col: number; path: Array<{ row: number; col: number }> }> = [];
    const visited = new Set<string>();

    const start = maze.start;
    queue.push({ row: start.row, col: start.col, path: [start] });
    visited.add(`${start.row},${start.col}`);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current.row === maze.end.row && current.col === maze.end.col) {
        return current.path;
      }

      const cell = maze.cells[current.row][current.col];
      const neighbors = this.getAccessibleNeighbors(maze, cell);

      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({
            row: neighbor.row,
            col: neighbor.col,
            path: [...current.path, { row: neighbor.row, col: neighbor.col }],
          });
        }
      }
    }

    return null;
  }

  private getAccessibleNeighbors(maze: Maze, cell: { row: number; col: number; walls: any }): Array<{ row: number; col: number }> {
    const neighbors: Array<{ row: number; col: number }> = [];

    if (!cell.walls.top && cell.row > 0) {
      neighbors.push({ row: cell.row - 1, col: cell.col });
    }
    if (!cell.walls.right && cell.col < maze.width - 1) {
      neighbors.push({ row: cell.row, col: cell.col + 1 });
    }
    if (!cell.walls.bottom && cell.row < maze.height - 1) {
      neighbors.push({ row: cell.row + 1, col: cell.col });
    }
    if (!cell.walls.left && cell.col > 0) {
      neighbors.push({ row: cell.row, col: cell.col - 1 });
    }

    return neighbors;
  }
}
