import { Maze } from '@/types/maze';

export interface Position {
  row: number;
  col: number;
}

export function isValidMove(
  maze: Maze,
  from: Position,
  to: Position
): boolean {
  // Check boundaries
  if (to.row < 0 || to.row >= maze.height || to.col < 0 || to.col >= maze.width) {
    return false;
  }

  // Check if move is adjacent (not diagonal)
  const rowDiff = to.row - from.row;
  const colDiff = to.col - from.col;

  if (Math.abs(rowDiff) + Math.abs(colDiff) !== 1) {
    return false;
  }

  // Check walls
  const currentCell = maze.cells[from.row][from.col];

  if (rowDiff === -1 && currentCell.walls.top) return false;
  if (rowDiff === 1 && currentCell.walls.bottom) return false;
  if (colDiff === -1 && currentCell.walls.left) return false;
  if (colDiff === 1 && currentCell.walls.right) return false;

  return true;
}

export function hasReachedEnd(position: Position, maze: Maze): boolean {
  return position.row === maze.end.row && position.col === maze.end.col;
}

export function getNextPosition(
  current: Position,
  direction: 'up' | 'down' | 'left' | 'right'
): Position {
  switch (direction) {
    case 'up':
      return { row: current.row - 1, col: current.col };
    case 'down':
      return { row: current.row + 1, col: current.col };
    case 'left':
      return { row: current.row, col: current.col - 1 };
    case 'right':
      return { row: current.row, col: current.col + 1 };
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
