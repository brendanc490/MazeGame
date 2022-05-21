// Initialize the canvas
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

let current;
let goal;

class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting grid
    current = this.grid[0][0];
    this.grid[this.rows - 1][this.columns - 1].goal = true;

  }
  
  // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
  createMaze() {
    maze.width = this.size;
    maze.height = this.size;
    //maze.style.background = "black";
    // Set the first cell as visited
    current.visited = true;
    // Loop through the 2d grid array and call the show method for each cell instance
    /*for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }*/
    // This function will assign the variable 'next' to random cell out of the current cells available neighbouting cells
    let next = current.checkNeighbours();
    // If there is a non visited neighbour cell
    if (next) {
      next.visited = true;
      // Add the current cell to the stack for backtracking
      this.stack.push(current);
      // this function will highlight the current cell on the grid. The parameter columns is passed
      // in order to set the size of the cell
      /*current.highlight(this.columns);*/
      // This function compares the current cell to the next cell and removes the relevant walls for each cell
      current.removeWalls(current, next);
      // Set the nect cell to the current cell
      current = next;

      // Else if there are no available neighbours start backtracking using the stack
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }
    // If no more items in the stack then all cells have been visted and the function can be exited
    if (this.stack.length === 0) {
      generationComplete = true;
      return;
    }

    // Recursively call the draw function. This will be called up until the stack is empty
    /*window.requestAnimationFrame(() => {
      this.draw();
    });*/
    this.createMaze();
    //     setTimeout(() => {rd
    //       this.draw();
    //     }, 10);
  }

  show_start

  solution(){
    //greg code go here
    
    //makes 2D matrix to track predecessors
    let predMatrix = new Array(this.rows);
    for(let r = 0; r < this.rows; r++){
      predMatrix[r] = new Array(this.columns);
    }

    let finishedSet = new Set();
    let discoveredQueue = [];
    discoveredQueue.push(this.grid[0][0]);

    while(predMatrix[this.rows - 1][this.columns - 1] == undefined){
      let curCell = discoveredQueue.shift();
      let curNeighbors = curCell.getNeighboursArray(); 

      for(let i = 0; i < curNeighbors.length; i++){
        if(!finishedSet.has(curNeighbors[i]) && !discoveredQueue.includes(curNeighbors[i]) && curNeighbors[i] != undefined){
          discoveredQueue.push(curNeighbors[i]);
          predMatrix[curNeighbors[i].rowNum][curNeighbors[i].colNum] = curCell;
        }
      }

      finishedSet.add(curCell);
    }

    let output = [];
    let cur = this.grid[this.rows - 1][this.columns - 1];
    while(cur){
      output.push(cur);
      cur = predMatrix[cur.rowNum][cur.colNum];
    }

    output = output.reverse();

    /*for(let i = 0; i < output.length; i++){
      console.log(output[i].rowNum + ", " + output[i].colNum);
    }*/

    return output;
  }
  
  draw(){
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "black";
    // Set the first cell as visited
    // Loop through the 2d grid array and call the show method for each cell instance
    current.highlight(this.columns);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }
  }
}

class Cell {
  // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.goal = false;
    // parentGrid is passed in to enable the checkneighbours method.
    // parentSize is passed in to set the size of each cell on the grid
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }

  getNeighboursArray(){
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !this.walls.topWall) neighbours.push(top);
    if (right && !this.walls.rightWall) neighbours.push(right);
    if (bottom && !this.walls.bottomWall) neighbours.push(bottom);
    if (left && !this.walls.leftWall) neighbours.push(left);

    return neighbours;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    // Choose a random neighbour from the neighbours array
    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  // Highlights the current cell on the grid. Columns is once again passed in to set the size of the grid.
  highlight(columns) {
    // Additions and subtractions added so the highlighted cell does cover the walls
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;
    ctx.fillStyle = "blue";
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  highlightSolution(nextCell, columns) {
    // Additions and subtractions added so the highlighted cell does cover the walls
    let x = (this.colNum * this.parentSize) / columns + 25;
    let y = (this.rowNum * this.parentSize) / columns + 25;
	let nextY;
	let nextX;
	ctx.fillStyle = "purple";
	if (nextCell){
		nextY = nextCell.rowNum;
		nextX = nextCell.colNum;
	} else {
		nextY = this.rowNum;
		nextX = this.colNum;
	}
	console.log(nextY + "," + nextX);
	if (nextY > this.rowNum){
		ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 50,
      this.parentSize / columns + 50,
    );
	} else if (nextY < this.rowNum) {
		ctx.fillRect(
      x,
      (this.rowNum * this.parentSize) / columns - 50,
      this.parentSize / columns - 50,
	  this.parentSize / columns + 10,
    );
	} else if (nextX > this.colNum){
		ctx.fillRect(
      x,
      y,
      this.parentSize / columns + 50,
      this.parentSize / columns - 50,
    );
	} else  if (nextX < this.colNum) {
		ctx.fillRect(
      (this.colNum * this.parentSize) / columns - 50,
      y,
      this.parentSize / columns + 10,
      this.parentSize / columns - 50,
    );
	} 
    
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 50,
      this.parentSize / columns - 50
    );
  }

  removeWalls(cell1, cell2) {
    // compares to two cells on x axis
    let x = cell1.colNum - cell2.colNum;
    // Removes the relevant walls if there is a different on x axis
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    // compares to two cells on x axis
    let y = cell1.rowNum - cell2.rowNum;
    // Removes the relevant walls if there is a different on x axis
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  // Draws each of the cells on the maze canvas
  show(size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    // console.log(`x =${x}`);
    // console.log(`y =${y}`);
    ctx.strokeStyle = "#ffffff";
    if (this.rowNum === 0 && this.colNum === 0){
      ctx.fillStyle = "red"
    } else {
      ctx.fillStyle = "black";
    }
    ctx.lineWidth = 2;
    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
    if (this.goal) {
      ctx.fillStyle = "rgb(83, 247, 43)";
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

// let newMaze = new Maze(600, 50, 50);
// newMaze.setup();
// newMaze.draw();
