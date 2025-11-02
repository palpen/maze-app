import { MazeGenerator, AlgorithmType } from '@/types/maze';
import { RecursiveBacktrackingGenerator } from './RecursiveBacktracking';
import { PrimsAlgorithmGenerator } from './PrimsAlgorithm';
import { KruskalsAlgorithmGenerator } from './KruskalsAlgorithm';

const generators: Record<AlgorithmType, MazeGenerator> = {
  'recursive-backtracking': new RecursiveBacktrackingGenerator(),
  'dfs': new RecursiveBacktrackingGenerator(),
  'prims': new PrimsAlgorithmGenerator(),
  'kruskal': new KruskalsAlgorithmGenerator(),
};

export function getMazeGenerator(type: AlgorithmType): MazeGenerator {
  return generators[type];
}

export function getAllGenerators(): Array<{ type: AlgorithmType; generator: MazeGenerator }> {
  return Object.entries(generators).map(([type, generator]) => ({
    type: type as AlgorithmType,
    generator,
  }));
}

export * from './MazeBase';
export * from './RecursiveBacktracking';
export * from './PrimsAlgorithm';
export * from './KruskalsAlgorithm';
