// Define all possible shapes for the block puzzle game (1010! style)
// Each shape is represented as a 2D array where 1 = filled block, 0 = empty

export const SHAPES = [
  // Single block
  {
    id: 'single',
    pattern: [[1]],
  },
  
  // 2-block shapes
  {
    id: 'horizontal-2',
    pattern: [[1, 1]],
  },
  {
    id: 'vertical-2',
    pattern: [[1], [1]],
  },
  
  // 3-block shapes
  {
    id: 'horizontal-3',
    pattern: [[1, 1, 1]],
  },
  {
    id: 'vertical-3',
    pattern: [[1], [1], [1]],
  },
  {
    id: 'L-shape',
    pattern: [
      [1, 0],
      [1, 1]
    ],
  },
  {
    id: 'L-shape-mirror',
    pattern: [
      [0, 1],
      [1, 1]
    ],
  },
  
  // 4-block shapes
  {
    id: 'horizontal-4',
    pattern: [[1, 1, 1, 1]],
  },
  {
    id: 'vertical-4',
    pattern: [[1], [1], [1], [1]],
  },
  {
    id: 'square-2x2',
    pattern: [
      [1, 1],
      [1, 1]
    ],
  },
  {
    id: 'T-shape',
    pattern: [
      [1, 1, 1],
      [0, 1, 0]
    ],
  },
  {
    id: 'L-shape-large',
    pattern: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
  },
  
  // 5-block shapes
  {
    id: 'horizontal-5',
    pattern: [[1, 1, 1, 1, 1]],
  },
  {
    id: 'vertical-5',
    pattern: [[1], [1], [1], [1], [1]],
  },
  {
    id: 'plus-shape',
    pattern: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
  },
  
  // 3x3 square
  {
    id: 'square-3x3',
    pattern: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
  },
];

// Get random shapes for the tray
export function getRandomShapes(count = 3) {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    shapes.push({
      ...SHAPES[randomIndex],
      uniqueId: `${SHAPES[randomIndex].id}-${Date.now()}-${i}`
    });
  }
  return shapes;
}
