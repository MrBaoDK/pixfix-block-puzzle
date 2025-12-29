import { useState } from 'react';

function ShapeTray({ shapes, onShapeSelect, selectedShape, texture }) {
  const getCellStyle = () => {
    if (!texture) return {};
    
    return {
      backgroundImage: `url(${texture})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  const renderShape = (shape, isSelected) => {
    const pattern = shape.pattern;
    const maxDim = Math.max(pattern.length, pattern[0]?.length || 0);
    
    return (
      <div
        key={shape.uniqueId}
        className={`
          p-4 rounded-lg cursor-pointer transition-all
          ${isSelected 
            ? 'bg-blue-600 ring-4 ring-blue-400 scale-105' 
            : 'bg-gray-700 hover:bg-gray-600'
          }
        `}
        onClick={() => onShapeSelect(shape)}
      >
        <div className={`grid gap-0.5`} style={{ 
          gridTemplateColumns: `repeat(${pattern[0]?.length || 1}, 1fr)`,
        }}>
          {pattern.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-6 h-6 rounded-sm
                  ${cell === 1 
                    ? 'bg-blue-500' 
                    : 'bg-transparent'
                  }
                `}
                style={cell === 1 ? getCellStyle() : {}}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4">Available Shapes</h2>
      <div className="flex gap-4 justify-center items-center">
        {shapes.map(shape => renderShape(shape, selectedShape?.uniqueId === shape.uniqueId))}
      </div>
    </div>
  );
}

export default ShapeTray;
