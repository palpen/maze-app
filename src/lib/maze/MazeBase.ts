import { Maze, Cell } from '@/types/maze';

export abstract class MazeBase {
  protected createEmptyMaze(width: number, height: number): Maze {
    const cells: Cell[][] = [];

    for (let row = 0; row < height; row++) {
      cells[row] = [];
      for (let col = 0; col < width; col++) {
        cells[row][col] = {
          row,
          col,
          walls: {
            top: true,
            right: true,
            bottom: true,
            left: true,
          },
          visited: false,
        };
      }
    }

    return {
      width,
      height,
      cells,
      start: { row: 0, col: 0 },
      end: { row: height - 1, col: width - 1 },
    };
  }

  protected getNeighbors(maze: Maze, row: number, col: number): Cell[] {
    const neighbors: Cell[] = [];
    const directions = [
      { row: -1, col: 0 }, // top
      { row: 0, col: 1 },  // right
      { row: 1, col: 0 },  // bottom
      { row: 0, col: -1 }, // left
    ];

    for (const dir of directions) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      if (
        newRow >= 0 &&
        newRow < maze.height &&
        newCol >= 0 &&
        newCol < maze.width
      ) {
        neighbors.push(maze.cells[newRow][newCol]);
      }
    }

    return neighbors;
  }

  protected removeWall(cell1: Cell, cell2: Cell): void {
    const rowDiff = cell2.row - cell1.row;
    const colDiff = cell2.col - cell1.col;

    if (rowDiff === 1) {
      cell1.walls.bottom = false;
      cell2.walls.top = false;
    } else if (rowDiff === -1) {
      cell1.walls.top = false;
      cell2.walls.bottom = false;
    } else if (colDiff === 1) {
      cell1.walls.right = false;
      cell2.walls.left = false;
    } else if (colDiff === -1) {
      cell1.walls.left = false;
      cell2.walls.right = false;
    }
  }
}
