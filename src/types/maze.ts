export interface Cell {
  row: number;
  col: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export interface Maze {
  width: number;
  height: number;
  cells: Cell[][];
  start: { row: number; col: number };
  end: { row: number; col: number };
}

export interface MazeGenerator {
  generate(width: number, height: number): Maze;
  name: string;
  description: string;
}

export interface MazeSolver {
  solve(maze: Maze): { row: number; col: number }[] | null;
  name: string;
  description: string;
}

export type AlgorithmType = 'dfs' | 'recursive-backtracking' | 'prims' | 'kruskal';
export type SolverType = 'bfs' | 'dfs' | 'astar';
