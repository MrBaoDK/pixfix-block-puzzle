import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ShapeTray from './components/ShapeTray';
import ScoreBoard from './components/ScoreBoard';
import ThemeGenerator from './components/ThemeGenerator';
import { getRandomShapes } from './data/shapes';
import {
  createEmptyBoard,
  canPlaceShape,
  placeShape,
  checkAndClearLines,
  hasValidMove,
  calculateScore
} from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [shapes, setShapes] = useState(getRandomShapes(3));
  const [selectedShape, setSelectedShape] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore') || '0');
  });
  const [ghostPosition, setGhostPosition] = useState(null);
  const [texture, setTexture] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  useEffect(() => {
    if (shapes.length === 0) {
      setShapes(getRandomShapes(3));
      setSelectedShape(null);
    }
  }, [shapes]);

  useEffect(() => {
    // Check if game is over (no valid moves)
    if (shapes.length > 0 && !hasValidMove(board, shapes)) {
      setGameOver(true);
    }
  }, [board, shapes]);

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };

  const handleCellClick = (row, col) => {
    if (!selectedShape || gameOver) return;

    if (canPlaceShape(board, selectedShape, row, col)) {
      // Place the shape
      const newBoard = placeShape(board, selectedShape, row, col, texture);
      
      // Check and clear lines
      const { board: clearedBoard, linesCleared, cellsCleared } = checkAndClearLines(newBoard);
      setBoard(clearedBoard);

      // Calculate score
      const points = calculateScore(selectedShape, linesCleared, cellsCleared);
      const newScore = score + points;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
      }

      // Remove placed shape from tray
      const remainingShapes = shapes.filter(s => s.uniqueId !== selectedShape.uniqueId);
      setShapes(remainingShapes);
      setSelectedShape(null);
      setGhostPosition(null);
    }
  };

  const handleBoardHover = (row, col) => {
    if (!selectedShape || gameOver) {
      setGhostPosition(null);
      return;
    }

    if (canPlaceShape(board, selectedShape, row, col)) {
      setGhostPosition({ row, col });
    } else {
      setGhostPosition(null);
    }
  };

  const handleTextureGenerated = (textureUrl) => {
    setTexture(textureUrl);
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setShapes(getRandomShapes(3));
    setSelectedShape(null);
    setScore(0);
    setGhostPosition(null);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          PixFit Block Puzzle
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 space-y-6">
            <ScoreBoard score={score} highScore={highScore} />
            <ThemeGenerator onTextureGenerated={handleTextureGenerated} />
            
            {gameOver && (
              <div className="bg-red-600 p-6 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Game Over!
                </h2>
                <p className="text-white text-center mb-4">
                  No more valid moves
                </p>
                <button
                  onClick={handleRestart}
                  className="w-full px-4 py-3 bg-white text-red-600 font-bold rounded-lg
                           hover:bg-gray-100 transition-colors"
                >
                  New Game
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 flex justify-center items-start">
            <div
              onMouseMove={(e) => {
                if (!selectedShape) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const cellSize = 33; // approximate cell size including gap
                const col = Math.floor((e.clientX - rect.left - 8) / cellSize);
                const row = Math.floor((e.clientY - rect.top - 8) / cellSize);
                if (row >= 0 && row < 10 && col >= 0 && col < 10) {
                  handleBoardHover(row, col);
                }
              }}
              onMouseLeave={() => setGhostPosition(null)}
            >
              <GameBoard
                board={board}
                onCellClick={handleCellClick}
                ghostShape={selectedShape}
                ghostPosition={ghostPosition}
                texture={texture}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ShapeTray
            shapes={shapes}
            onShapeSelect={handleShapeSelect}
            selectedShape={selectedShape}
            texture={texture}
          />
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Click a shape from the tray, then click on the board to place it.</p>
          <p>Clear complete rows or columns to score points!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
