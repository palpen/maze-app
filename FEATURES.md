# Interactive Maze App - Feature Guide

## 🎮 How to Play

### Getting Started
1. **Generate a Maze** - Click "Generate Maze" to create a new maze
2. **Start Playing** - Click "🎮 Start Playing" to begin
3. **Navigate** - Use Arrow Keys or WASD to move through the maze
4. **Win** - Reach the red square (end) to complete the maze!

### Controls
- **Arrow Keys** or **WASD** - Move in all four directions
- Movement is blocked by walls (you'll see a shake animation)
- Move count and timer track your progress

## 📊 Game Features

### Play Mode
When you click "Start Playing", the app enters interactive mode:
- **Purple player circle** appears at the start (green square)
- **Timer** starts counting
- **Move counter** tracks every successful move
- **Keyboard controls** become active

### Game Stats Panel
Real-time statistics displayed while playing:
- **Time** - Elapsed time in MM:SS format
- **Moves** - Number of moves made
- **Optimal** - Shortest possible path (if calculated)

### Game Controls
- **Reset Position** - Return to start without changing stats
- **Calculate Hint** - Compute the optimal solution path
- **Show Solution Hint** - Toggle visualization of the optimal path
- **Stop Playing** - Exit play mode

### Win Celebration
When you reach the end:
- 🎉 **Victory modal** appears
- **Statistics summary**:
  - Time taken
  - Your move count
  - Optimal move count
  - Efficiency percentage (color-coded)
- **Options**:
  - Play Again (same maze)
  - Generate New Maze
  - Close modal

## 🎨 Visual Elements

### Legend
- **Green Square** - Start position
- **Red Square** - End position (goal)
- **Purple Circle** - Your current position
- **Blue Line** - Solution/hint path
- **Black Lines** - Maze walls

### Animations
- **Shake Animation** - Triggered when attempting invalid moves
- **Smooth Rendering** - Canvas-based rendering for performance

## 🧠 Auto-Solve Mode

### When Not Playing
You can use auto-solve features:
1. Select a **Solver Algorithm** (BFS, DFS, A*)
2. Click **Solve Maze** to calculate optimal path
3. Toggle **Show Solution Path** to visualize

### Algorithm Descriptions
- **BFS** - Guarantees shortest path, explores evenly
- **DFS** - Faster but may not find shortest path
- **A*** - Smart heuristic-based pathfinding

## 🏗️ Maze Generation

### Algorithms Available
1. **Recursive Backtracking**
   - Classic DFS-based
   - Long winding passages
   - Very organic feel

2. **Prim's Algorithm**
   - Grows from center
   - More branching patterns
   - Organic structure

3. **Kruskal's Algorithm**
   - Uniform complexity
   - Random connections
   - Balanced difficulty

### Configuration
- **Width/Height**: 5-50 cells
- **Cell Size**: 10-30 pixels
- Larger mazes = more challenge
- Smaller cells = fit more on screen

## 💡 Tips & Tricks

### Playing Efficiently
1. **Plan ahead** - Look at the maze structure before moving
2. **Use hints wisely** - Calculate optimal path for guidance
3. **Track your route** - Remember where you've been
4. **Practice** - Try different maze sizes and algorithms

### Maximizing Score
- Fewer moves = higher efficiency
- Compare your moves to optimal path
- Try to beat your best time
- Aim for 90%+ efficiency (green rating)

## 🔧 Technical Details

### Performance
- Canvas rendering for smooth graphics
- Optimized pathfinding algorithms
- No lag even on large mazes (50x50)

### Keyboard Support
- **Arrow Keys** - Standard navigation
- **WASD** - Alternative controls (gaming-style)
- Prevents default browser scrolling during play

### State Management
- Real-time move validation
- Automatic win detection
- Persistent statistics during gameplay
- Clean state reset between games

## 🚀 Deployment Ready

This app is fully configured for Vercel deployment:
- Zero configuration needed
- Automatic builds
- Perfect for sharing and demos
- Works on mobile (touch support coming soon!)

## 🧪 Testing

Run tests to verify functionality:
```bash
npm test
```

Tests cover:
- Movement validation
- Win condition detection
- Maze generation
- Pathfinding algorithms
- Game logic utilities
