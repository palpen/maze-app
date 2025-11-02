'use client';

import { useEffect, useRef } from 'react';
import { Maze } from '@/types/maze';

interface MazeCanvasProps {
  maze: Maze;
  solution?: Array<{ row: number; col: number }>;
  cellSize?: number;
  showSolution?: boolean;
  playerPosition?: { row: number; col: number } | null;
  shake?: boolean;
}

export default function MazeCanvas({
  maze,
  solution = [],
  cellSize = 20,
  showSolution = false,
  playerPosition = null,
  shake = false
}: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;

    for (let row = 0; row < maze.height; row++) {
      for (let col = 0; col < maze.width; col++) {
        const cell = maze.cells[row][col];
        const x = col * cellSize;
        const y = row * cellSize;

        if (cell.walls.top) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + cellSize, y);
          ctx.stroke();
        }
        if (cell.walls.right) {
          ctx.beginPath();
          ctx.moveTo(x + cellSize, y);
          ctx.lineTo(x + cellSize, y + cellSize);
          ctx.stroke();
        }
        if (cell.walls.bottom) {
          ctx.beginPath();
          ctx.moveTo(x, y + cellSize);
          ctx.lineTo(x + cellSize, y + cellSize);
          ctx.stroke();
        }
        if (cell.walls.left) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + cellSize);
          ctx.stroke();
        }
      }
    }

    // Draw start point
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(
      maze.start.col * cellSize + cellSize * 0.25,
      maze.start.row * cellSize + cellSize * 0.25,
      cellSize * 0.5,
      cellSize * 0.5
    );

    // Draw end point
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(
      maze.end.col * cellSize + cellSize * 0.25,
      maze.end.row * cellSize + cellSize * 0.25,
      cellSize * 0.5,
      cellSize * 0.5
    );

    // Draw solution path
    if (showSolution && solution.length > 0) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(
        solution[0].col * cellSize + cellSize / 2,
        solution[0].row * cellSize + cellSize / 2
      );

      for (let i = 1; i < solution.length; i++) {
        ctx.lineTo(
          solution[i].col * cellSize + cellSize / 2,
          solution[i].row * cellSize + cellSize / 2
        );
      }
      ctx.stroke();
    }

    // Draw player
    if (playerPosition) {
      const x = playerPosition.col * cellSize + cellSize / 2;
      const y = playerPosition.row * cellSize + cellSize / 2;
      const radius = cellSize * 0.35;

      // Draw player shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw player
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw player border
      ctx.strokeStyle = '#6d28d9';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [maze, solution, cellSize, showSolution, playerPosition]);

  return (
    <canvas
      ref={canvasRef}
      width={maze.width * cellSize}
      height={maze.height * cellSize}
      className={`border border-gray-300 rounded-lg shadow-lg bg-white ${shake ? 'animate-shake' : ''}`}
      style={{
        animation: shake ? 'shake 0.3s ease-in-out' : 'none'
      }}
    />
  );
}
