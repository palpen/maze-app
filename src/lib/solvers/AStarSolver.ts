import { MazeSolver, Maze } from '@/types/maze';

export class AStarSolver implements MazeSolver {
  name = 'A* Search';
  description = 'Heuristic-based search that efficiently finds the shortest path';

  solve(maze: Maze): { row: number; col: number }[] | null {
    const openSet = new Set<string>([`${maze.start.row},${maze.start.col}`]);
    const cameFrom = new Map<string, { row: number; col: number }>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    gScore.set(`${maze.start.row},${maze.start.col}`, 0);
    fScore.set(`${maze.start.row},${maze.start.col}`, this.heuristic(maze.start, maze.end));

    while (openSet.size > 0) {
      const current = this.getLowestFScore(openSet, fScore);
      const [currentRow, currentCol] = current.split(',').map(Number);

      if (currentRow === maze.end.row && currentCol === maze.end.col) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current);

      const cell = maze.cells[currentRow][currentCol];
      const neighbors = this.getAccessibleNeighbors(maze, cell);

      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.row},${neighbor.col}`;
        const tentativeGScore = (gScore.get(current) || 0) + 1;

        if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
          cameFrom.set(neighborKey, { row: currentRow, col: currentCol });
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, maze.end));

          if (!openSet.has(neighborKey)) {
            openSet.add(neighborKey);
          }
        }
      }
    }

    return null;
  }

  private heuristic(a: { row: number; col: number }, b: { row: number; col: number }): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  private getLowestFScore(openSet: Set<string>, fScore: Map<string, number>): string {
    let lowest = Infinity;
    let lowestKey = '';

    for (const key of openSet) {
      const score = fScore.get(key) || Infinity;
      if (score < lowest) {
        lowest = score;
        lowestKey = key;
      }
    }

    return lowestKey;
  }

  private reconstructPath(cameFrom: Map<string, { row: number; col: number }>, current: string): Array<{ row: number; col: number }> {
    const path: Array<{ row: number; col: number }> = [];
    let [row, col] = current.split(',').map(Number);

    path.unshift({ row, col });

    while (cameFrom.has(`${row},${col}`)) {
      const prev = cameFrom.get(`${row},${col}`)!;
      row = prev.row;
      col = prev.col;
      path.unshift({ row, col });
    }

    return path;
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
