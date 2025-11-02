import { isValidMove, hasReachedEnd, getNextPosition, formatTime } from '../gameLogic';
import { Maze } from '@/types/maze';

describe('gameLogic', () => {
  const mockMaze: Maze = {
    width: 3,
    height: 3,
    start: { row: 0, col: 0 },
    end: { row: 2, col: 2 },
    cells: [
      [
        { row: 0, col: 0, walls: { top: true, right: false, bottom: true, left: true }, visited: true },
        { row: 0, col: 1, walls: { top: true, right: false, bottom: true, left: false }, visited: true },
        { row: 0, col: 2, walls: { top: true, right: true, bottom: false, left: false }, visited: true },
      ],
      [
        { row: 1, col: 0, walls: { top: true, right: true, bottom: true, left: true }, visited: true },
        { row: 1, col: 1, walls: { top: true, right: true, bottom: true, left: true }, visited: true },
        { row: 1, col: 2, walls: { top: false, right: true, bottom: false, left: true }, visited: true },
      ],
      [
        { row: 2, col: 0, walls: { top: true, right: true, bottom: true, left: true }, visited: true },
        { row: 2, col: 1, walls: { top: true, right: true, bottom: true, left: true }, visited: true },
        { row: 2, col: 2, walls: { top: false, right: true, bottom: true, left: true }, visited: true },
      ],
    ],
  };

  describe('isValidMove', () => {
    it('allows movement through open passages', () => {
      expect(isValidMove(mockMaze, { row: 0, col: 0 }, { row: 0, col: 1 })).toBe(true);
    });

    it('blocks movement through walls', () => {
      expect(isValidMove(mockMaze, { row: 0, col: 0 }, { row: 1, col: 0 })).toBe(false);
    });

    it('blocks movement out of bounds', () => {
      expect(isValidMove(mockMaze, { row: 0, col: 0 }, { row: -1, col: 0 })).toBe(false);
      expect(isValidMove(mockMaze, { row: 2, col: 2 }, { row: 3, col: 2 })).toBe(false);
    });

    it('blocks diagonal movement', () => {
      expect(isValidMove(mockMaze, { row: 0, col: 0 }, { row: 1, col: 1 })).toBe(false);
    });

    it('blocks movement more than one cell', () => {
      expect(isValidMove(mockMaze, { row: 0, col: 0 }, { row: 0, col: 2 })).toBe(false);
    });
  });

  describe('hasReachedEnd', () => {
    it('returns true when at end position', () => {
      expect(hasReachedEnd({ row: 2, col: 2 }, mockMaze)).toBe(true);
    });

    it('returns false when not at end position', () => {
      expect(hasReachedEnd({ row: 0, col: 0 }, mockMaze)).toBe(false);
      expect(hasReachedEnd({ row: 1, col: 1 }, mockMaze)).toBe(false);
    });
  });

  describe('getNextPosition', () => {
    it('calculates next position for up direction', () => {
      expect(getNextPosition({ row: 1, col: 1 }, 'up')).toEqual({ row: 0, col: 1 });
    });

    it('calculates next position for down direction', () => {
      expect(getNextPosition({ row: 1, col: 1 }, 'down')).toEqual({ row: 2, col: 1 });
    });

    it('calculates next position for left direction', () => {
      expect(getNextPosition({ row: 1, col: 1 }, 'left')).toEqual({ row: 1, col: 0 });
    });

    it('calculates next position for right direction', () => {
      expect(getNextPosition({ row: 1, col: 1 }, 'right')).toEqual({ row: 1, col: 2 });
    });
  });

  describe('formatTime', () => {
    it('formats seconds correctly', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(5)).toBe('0:05');
      expect(formatTime(59)).toBe('0:59');
    });

    it('formats minutes and seconds correctly', () => {
      expect(formatTime(60)).toBe('1:00');
      expect(formatTime(65)).toBe('1:05');
      expect(formatTime(125)).toBe('2:05');
    });
  });
});
