import { MazeGenerator, Maze, Cell } from '@/types/maze';
import { MazeBase } from './MazeBase';

export class KruskalsAlgorithmGenerator extends MazeBase implements MazeGenerator {
  name = "Kruskal's Algorithm";
  description = 'Creates mazes by randomly connecting disjoint sets, resulting in uniform complexity';

  generate(width: number, height: number): Maze {
    const maze = this.createEmptyMaze(width, height);
    const walls: Array<{ cell1: Cell; cell2: Cell }> = [];
    const sets = new Map<string, Set<string>>();

    // Initialize each cell as its own set
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const key = `${row},${col}`;
        sets.set(key, new Set([key]));

        // Add right wall
        if (col < width - 1) {
          walls.push({
            cell1: maze.cells[row][col],
            cell2: maze.cells[row][col + 1]
          });
        }
        // Add bottom wall
        if (row < height - 1) {
          walls.push({
            cell1: maze.cells[row][col],
            cell2: maze.cells[row + 1][col]
          });
        }
      }
    }

    // Shuffle walls
    for (let i = walls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [walls[i], walls[j]] = [walls[j], walls[i]];
    }

    // Process walls
    for (const { cell1, cell2 } of walls) {
      const key1 = `${cell1.row},${cell1.col}`;
      const key2 = `${cell2.row},${cell2.col}`;

      const set1 = this.findSet(sets, key1);
      const set2 = this.findSet(sets, key2);

      if (set1 !== set2) {
        this.removeWall(cell1, cell2);
        this.unionSets(sets, set1, set2);
      }
    }

    return maze;
  }

  private findSet(sets: Map<string, Set<string>>, key: string): Set<string> {
    return sets.get(key)!;
  }

  private unionSets(sets: Map<string, Set<string>>, set1: Set<string>, set2: Set<string>): void {
    const newSet = new Set([...set1, ...set2]);
    for (const key of newSet) {
      sets.set(key, newSet);
    }
  }
}
