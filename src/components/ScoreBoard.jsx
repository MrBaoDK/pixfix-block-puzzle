function ScoreBoard({ score, highScore }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Score
          </h2>
          <p className="text-4xl font-bold text-white">{score}</p>
        </div>
        <div className="text-center">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Best
          </h2>
          <p className="text-4xl font-bold text-yellow-400">{highScore}</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
