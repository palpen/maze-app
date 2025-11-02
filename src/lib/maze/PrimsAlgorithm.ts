import { MazeGenerator, Maze, Cell } from '@/types/maze';
import { MazeBase } from './MazeBase';

export class PrimsAlgorithmGenerator extends MazeBase implements MazeGenerator {
  name = "Prim's Algorithm";
  description = 'Grows the maze from a starting point, creating more organic and branching patterns';

  generate(width: number, height: number): Maze {
    const maze = this.createEmptyMaze(width, height);
    const walls: Array<{ from: Cell; to: Cell }> = [];

    const startCell = maze.cells[Math.floor(height / 2)][Math.floor(width / 2)];
    startCell.visited = true;

    this.addWalls(maze, startCell, walls);

    while (walls.length > 0) {
      const randomIndex = Math.floor(Math.random() * walls.length);
      const { from, to } = walls[randomIndex];
      walls.splice(randomIndex, 1);

      if (!to.visited) {
        this.removeWall(from, to);
        to.visited = true;
        this.addWalls(maze, to, walls);
      }
    }

    return maze;
  }

  private addWalls(maze: Maze, cell: Cell, walls: Array<{ from: Cell; to: Cell }>): void {
    const neighbors = this.getNeighbors(maze, cell.row, cell.col);
    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        walls.push({ from: cell, to: neighbor });
      }
    }
  }
}
