# PixFit Block Puzzle

A 1010!-style block puzzle game built with React, Vite, and Tailwind CSS.

## Features

### Game Mechanics
- **10x10 Grid**: Classic block puzzle gameplay on a 10x10 board
- **17 Unique Shapes**: Various block configurations including lines, L-shapes, T-shapes, squares, and more
- **Click-to-Play**: Select a shape from the tray, then click on the board to place it
- **Ghost Preview**: Visual feedback shows where your shape will be placed
- **Line Clearing**: Complete rows or columns are automatically cleared
- **Smart Scoring**: Earn points for placing blocks with bonuses for clearing lines
- **High Score**: Your best score is saved locally
- **Game Over Detection**: The game detects when no valid moves remain

### Theme Customization
- **Image Upload**: Upload any image to use as a custom texture
- **Mock Imagen API**: Simulates a 2-second API delay (like Google Imagen)
- **Dynamic Textures**: Your uploaded image is applied to all filled blocks
- **Easy Reset**: Return to default styling with one click

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### How to Play

1. **Select a Shape**: Click on any shape in the "Available Shapes" tray at the bottom
2. **Place the Shape**: Click on any valid position on the 10x10 grid
3. **Clear Lines**: Complete entire rows or columns to clear them and score bonus points
4. **Keep Playing**: New shapes appear when all three are placed
5. **Customize Theme**: Upload an image using the Theme Generator to personalize your blocks

## Technology Stack

- **React 18**: Modern React with Hooks
- **Vite 7**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework with the new v4 syntax
- **LocalStorage**: High score persistence

## Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.jsx   # 10x10 game grid
│   ├── ShapeTray.jsx   # Available shapes display
│   ├── ScoreBoard.jsx  # Score tracking
│   └── ThemeGenerator.jsx  # Image upload and texture application
├── data/
│   └── shapes.js       # Shape definitions and utilities
├── services/
│   └── imagenMock.js   # Mock image API with 2s delay
├── utils/
│   └── gameLogic.js    # Game logic utilities
└── App.jsx             # Main app component
```

## License

MIT

