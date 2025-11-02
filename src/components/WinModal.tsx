'use client';

import { formatTime } from '@/lib/gameLogic';

interface WinModalProps {
  isOpen: boolean;
  moveCount: number;
  elapsedTime: number;
  optimalMoves: number;
  onPlayAgain: () => void;
  onNewMaze: () => void;
  onClose: () => void;
}

export default function WinModal({
  isOpen,
  moveCount,
  elapsedTime,
  optimalMoves,
  onPlayAgain,
  onNewMaze,
  onClose
}: WinModalProps) {
  if (!isOpen) return null;

  const efficiency = Math.round((optimalMoves / moveCount) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full animate-bounce-in">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-6">You solved the maze!</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold text-lg">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Moves:</span>
              <span className="font-semibold text-lg">{moveCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Optimal Moves:</span>
              <span className="font-semibold text-lg">{optimalMoves}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-gray-600">Efficiency:</span>
              <span className={`font-bold text-lg ${efficiency >= 90 ? 'text-green-600' : efficiency >= 70 ? 'text-yellow-600' : 'text-orange-600'}`}>
                {efficiency}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Play Again (Same Maze)
            </button>
            <button
              onClick={onNewMaze}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Generate New Maze
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
