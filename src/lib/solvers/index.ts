import { MazeSolver, SolverType } from '@/types/maze';
import { BFSSolver } from './BFSSolver';
import { DFSSolver } from './DFSSolver';
import { AStarSolver } from './AStarSolver';

const solvers: Record<SolverType, MazeSolver> = {
  'bfs': new BFSSolver(),
  'dfs': new DFSSolver(),
  'astar': new AStarSolver(),
};

export function getMazeSolver(type: SolverType): MazeSolver {
  return solvers[type];
}

export function getAllSolvers(): Array<{ type: SolverType; solver: MazeSolver }> {
  return Object.entries(solvers).map(([type, solver]) => ({
    type: type as SolverType,
    solver,
  }));
}

export * from './BFSSolver';
export * from './DFSSolver';
export * from './AStarSolver';
