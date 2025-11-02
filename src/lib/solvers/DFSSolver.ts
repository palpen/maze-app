import { MazeSolver, Maze } from '@/types/maze';

export class DFSSolver implements MazeSolver {
  name = 'Depth-First Search';
  description = 'Explores paths deeply before backtracking, faster but may not find shortest path';

  solve(maze: Maze): { row: number; col: number }[] | null {
    const visited = new Set<string>();
    const path: Array<{ row: number; col: number }> = [];

    const dfs = (row: number, col: number): boolean => {
      if (row === maze.end.row && col === maze.end.col) {
        path.push({ row, col });
        return true;
      }

      const key = `${row},${col}`;
      if (visited.has(key)) {
        return false;
      }

      visited.add(key);
      path.push({ row, col });

      const cell = maze.cells[row][col];
      const neighbors = this.getAccessibleNeighbors(maze, cell);

      for (const neighbor of neighbors) {
        if (dfs(neighbor.row, neighbor.col)) {
          return true;
        }
      }

      path.pop();
      return false;
    };

    if (dfs(maze.start.row, maze.start.col)) {
      return path;
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
