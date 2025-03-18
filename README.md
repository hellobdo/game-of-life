# Conway's Game of Life

A simple implementation of Conway's Game of Life using HTML, CSS, and JavaScript.

## How to Use

1. Open `index.html` in a web browser.
2. The game grid will be displayed.
3. Click on cells in the grid to toggle them between alive (black) and dead (white).
4. Use the controls:
   - **Start**: Begin the simulation
   - **Stop**: Pause the simulation
   - **Clear**: Reset the grid to empty

## Rules of the Game

Conway's Game of Life follows these rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors survives
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

## Try These Patterns

You can create these classic Game of Life patterns:

### Glider
A pattern that "glides" diagonally across the grid:
```
.O.
..O
OOO
```

### Blinker
A pattern that oscillates between two states:
```
.O.
.O.
.O.
```

### Toad
A pattern that oscillates between two states:
```
.OOO
OOO.
```

Click on the corresponding cells in the grid to create these patterns and watch how they evolve! 