// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // Get elements
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    console.log('Elements found:', {
        canvas: !!canvas,
        ctx: !!ctx,
        startBtn: !!startBtn,
        stopBtn: !!stopBtn,
        clearBtn: !!clearBtn
    });
    
    // Game settings
    const cellSize = 10;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    let grid = createGrid();
    let isRunning = false;
    let intervalId = null;
    
    console.log('Grid dimensions:', { cols, rows, cellSize });
    
    // Initialize empty grid
    function createGrid() {
        const newGrid = [];
        for (let i = 0; i < cols; i++) {
            newGrid[i] = [];
            for (let j = 0; j < rows; j++) {
                newGrid[i][j] = 0;
            }
        }
        return newGrid;
    }
    
    // Draw the grid
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * cellSize;
                const y = j * cellSize;
                
                if (grid[i][j] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }
    }
    
    // Count neighbors
    function countNeighbors(x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;
                const col = (x + i + cols) % cols;
                const row = (y + j + rows) % rows;
                sum += grid[col][row];
            }
        }
        return sum;
    }
    
    // Update grid
    function updateGrid() {
        const nextGen = createGrid();
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const state = grid[i][j];
                const neighbors = countNeighbors(i, j);
                
                if (state === 0 && neighbors === 3) {
                    nextGen[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    nextGen[i][j] = 0;
                } else {
                    nextGen[i][j] = state;
                }
            }
        }
        
        grid = nextGen;
        drawGrid();
    }
    
    // Set up initial pattern in center
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);
    
    // Create a simple glider
    grid[centerX][centerY - 1] = 1;
    grid[centerX + 1][centerY] = 1;
    grid[centerX - 1][centerY + 1] = 1;
    grid[centerX][centerY + 1] = 1;
    grid[centerX + 1][centerY + 1] = 1;
    
    // Start the animation
    drawGrid();
    setInterval(updateGrid, 100);
    
    // Initialize the game
    function init() {
        console.log('Initializing game...');
        setupInitialPattern(); // Set up initial pattern instead of empty grid
        
        // Start button
        startBtn.addEventListener('click', () => {
            console.log('Start button clicked');
            if (!isRunning) {
                console.log('Starting game loop...');
                isRunning = true;
                updateGrid(); // Run first update immediately
                intervalId = setInterval(() => {
                    if (isRunning) {
                        updateGrid();
                    }
                }, 100);
            }
        });
        
        // Stop button
        stopBtn.addEventListener('click', () => {
            console.log('Stop button clicked');
            isRunning = false;
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        });
        
        // Clear button
        clearBtn.addEventListener('click', () => {
            console.log('Clear button clicked');
            isRunning = false;
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            grid = createGrid();
            drawGrid();
        });
        
        // Canvas click handler to toggle cells
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            const x = Math.floor((event.clientX - rect.left) * scaleX / cellSize);
            const y = Math.floor((event.clientY - rect.top) * scaleY / cellSize);
            
            if (x >= 0 && x < cols && y >= 0 && y < rows) {
                console.log('Toggling cell at:', x, y);
                grid[x][y] = grid[x][y] ? 0 : 1;
                drawGrid();
            }
        });
    }
    
    // Start the game
    init();
}); 