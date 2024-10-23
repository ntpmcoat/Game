const getGridSize = (cellSize) => {
    const boardWidth = window.innerWidth * 0.9; // 90% of the viewport width
    const boardHeight = window.innerHeight * 0.7; // 70% of the viewport height
    const cols = Math.floor(boardWidth / cellSize);
    const rows = Math.floor(boardHeight / cellSize);
    return { cols, rows };
};