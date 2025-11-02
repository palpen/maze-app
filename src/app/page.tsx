'use client';

import { useState, useCallback, useEffect } from 'react';
import MazeCanvas from '@/components/MazeCanvas';
import WinModal from '@/components/WinModal';
import { Maze, AlgorithmType, SolverType } from '@/types/maze';
import { getMazeGenerator, getAllGenerators } from '@/lib/maze';
import { getMazeSolver, getAllSolvers } from '@/lib/solvers';
import { Position, isValidMove, hasReachedEnd, getNextPosition, formatTime } from '@/lib/gameLogic';

export default function Home() {
  const [maze, setMaze] = useState<Maze | null>(null);
  const [solution, setSolution] = useState<Array<{ row: number; col: number }>>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [cellSize, setCellSize] = useState(20);
  const [generatorType, setGeneratorType] = useState<AlgorithmType>('recursive-backtracking');
  const [solverType, setSolverType] = useState<SolverType>('bfs');

  // Game state
  const [playerPosition, setPlayerPosition] = useState<Position | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [invalidMoveShake, setInvalidMoveShake] = useState(false);

  const generators = getAllGenerators();
  const solvers = getAllSolvers();

  const generateMaze = useCallback(() => {
    const generator = getMazeGenerator(generatorType);
    const newMaze = generator.generate(width, height);
    setMaze(newMaze);
    setSolution([]);
    setShowSolution(false);
    setPlayerPosition(null);
    setIsPlaying(false);
    setMoveCount(0);
    setStartTime(null);
    setElapsedTime(0);
    setHasWon(false);
    setShowHint(false);
  }, [generatorType, width, height]);

  const startGame = useCallback(() => {
    if (!maze) return;
    setPlayerPosition({ row: maze.start.row, col: maze.start.col });
    setIsPlaying(true);
    setMoveCount(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setHasWon(false);
    setShowHint(false);
    setShowSolution(false);
  }, [maze]);

  const resetPlayer = useCallback(() => {
    if (!maze) return;
    setPlayerPosition({ row: maze.start.row, col: maze.start.col });
    setMoveCount(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setHasWon(false);
  }, [maze]);

  const solveMaze = useCallback(() => {
    if (!maze) return;

    const solver = getMazeSolver(solverType);
    const path = solver.solve(maze);

    if (path) {
      setSolution(path);
      setShowSolution(true);
    } else {
      alert('No solution found!');
    }
  }, [maze, solverType]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || hasWon || !startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, hasWon, startTime]);

  // Keyboard controls
  useEffect(() => {
    if (!isPlaying || !maze || !playerPosition || hasWon) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let direction: 'up' | 'down' | 'left' | 'right' | null = null;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'right';
          break;
      }

      if (direction) {
        e.preventDefault();
        const nextPosition = getNextPosition(playerPosition, direction);

        if (isValidMove(maze, playerPosition, nextPosition)) {
          setPlayerPosition(nextPosition);
          setMoveCount((prev) => prev + 1);

          // Check win condition
          if (hasReachedEnd(nextPosition, maze)) {
            setHasWon(true);
            setIsPlaying(false);
          }
        } else {
          // Invalid move - trigger shake animation
          setInvalidMoveShake(true);
          setTimeout(() => setInvalidMoveShake(false), 300);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, maze, playerPosition, hasWon]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Maze Generator & Solver
        </h1>
        <p className="text-gray-600 mb-8">
          Create and solve mazes with multiple algorithms
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Maze Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width: {width}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height: {height}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cell Size: {cellSize}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={cellSize}
                  onChange={(e) => setCellSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generation Algorithm
                </label>
                <select
                  value={generatorType}
                  onChange={(e) => setGeneratorType(e.target.value as AlgorithmType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {generators.map(({ type, generator }) => (
                    <option key={type} value={type}>
                      {generator.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getMazeGenerator(generatorType).description}
                </p>
              </div>

              <button
                onClick={generateMaze}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Generate Maze
              </button>
            </div>

            {maze && !isPlaying && (
              <>
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Play Mode</h2>
                  <p className="text-sm text-gray-600">
                    Navigate the maze using arrow keys or WASD
                  </p>
                  <button
                    onClick={startGame}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    🎮 Start Playing
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Auto Solve</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solver Algorithm
                    </label>
                    <select
                      value={solverType}
                      onChange={(e) => setSolverType(e.target.value as SolverType)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {solvers.map(({ type, solver }) => (
                        <option key={type} value={type}>
                          {solver.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {getMazeSolver(solverType).description}
                    </p>
                  </div>

                  <button
                    onClick={solveMaze}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Solve Maze
                  </button>

                  {solution.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showSolution"
                        checked={showSolution}
                        onChange={(e) => setShowSolution(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="showSolution" className="text-sm text-gray-700">
                        Show Solution Path
                      </label>
                    </div>
                  )}

                  {solution.length > 0 && (
                    <div className="text-sm text-gray-600 pt-2 border-t">
                      Optimal path: {solution.length} steps
                    </div>
                  )}
                </div>
              </>
            )}

            {maze && isPlaying && (
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Game Stats</h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-lg">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Moves:</span>
                    <span className="font-semibold text-lg">{moveCount}</span>
                  </div>
                  {solution.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Optimal:</span>
                      <span className="font-semibold text-lg">{solution.length}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <button
                    onClick={resetPlayer}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Reset Position
                  </button>

                  {solution.length === 0 && (
                    <button
                      onClick={solveMaze}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Calculate Hint
                    </button>
                  )}

                  {solution.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showHint"
                        checked={showHint}
                        onChange={(e) => {
                          setShowHint(e.target.checked);
                          setShowSolution(e.target.checked);
                        }}
                        className="rounded"
                      />
                      <label htmlFor="showHint" className="text-sm text-gray-700">
                        Show Solution Hint
                      </label>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setPlayerPosition(null);
                    }}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Stop Playing
                  </button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Use Arrow Keys or WASD to move
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Legend</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>End</span>
                </div>
                {playerPosition && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span>Player</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Solution Path</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maze Display */}
          <div className="lg:col-span-3 flex items-center justify-center">
            {maze ? (
              <MazeCanvas
                maze={maze}
                solution={solution}
                cellSize={cellSize}
                showSolution={showSolution}
                playerPosition={playerPosition}
                shake={invalidMoveShake}
              />
            ) : (
              <div className="text-center text-gray-500 py-20">
                <p className="text-xl mb-2">No maze generated yet</p>
                <p>Click "Generate Maze" to create one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Win Modal */}
        <WinModal
          isOpen={hasWon}
          moveCount={moveCount}
          elapsedTime={elapsedTime}
          optimalMoves={solution.length}
          onPlayAgain={resetPlayer}
          onNewMaze={generateMaze}
          onClose={() => setHasWon(false)}
        />
      </div>
    </main>
  );
}
