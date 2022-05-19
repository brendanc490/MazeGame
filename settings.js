let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#number");
let complete = document.querySelector(".complete");
let replay = document.querySelector(".replay");
let close = document.querySelector(".close");
let text = document.getElementsByClassName("timer");

let newMaze;
let completedGame = false;

form.addEventListener("submit", generateMaze);

replay.addEventListener("click", () => {
  location.reload();
});

close.addEventListener("click", () => {
  complete.style.display = "none";
});

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

function generateMaze(e) {
  e.preventDefault();

  if (rowsCols.value == "") {
    return alert("Please enter a number of columns");
  }

  let mazeSize = 800;
  let number = rowsCols.value;
  if (number > 100) {
    alert("Maze too large!");
    return;
  }

  form.style.display = "none";

  newMaze = new Maze(mazeSize, number, number);
  newMaze.setup();
  current = newMaze.grid[Math.floor(Math.random() * newMaze.columns)][Math.floor(Math.random() * newMaze.columns)]
  newMaze.createMaze();
  document.getElementById('timer').innerHTML = "Timer: " + number*2;
  newMaze.draw();
  newMaze.grid[0][0].highlight(newMaze.columns)
  current = newMaze.grid[0][0];
  text[0].style.display = "block";

  var sec = number*2;
  var time = setInterval(myTimer, 1000);
  
  function myTimer() {
      document.getElementById('timer').innerHTML = "Timer: " + sec;
      sec--;
      if (sec == -1) {
          clearInterval(time);
          alert("Time's up!");
      } else if (completedGame) {
        clearInterval(time);
      }
  }
}

var map = {};

move = move2 = async function(e) {
    if (!generationComplete) return;
    if (current.goal) return;
    let row = current.rowNum;
    let col = current.colNum;
    console.log(e.key)
    map[e.key] = e.type == "keydown";
    if (map["ArrowUp"] && map["ArrowRight"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowUp"] && map["ArrowLeft"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowDown"] && map["ArrowRight"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
          } else  if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowDown"] && map["ArrowLeft"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["w"] && map["d"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["w"] && map["a"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["s"] && map["d"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
          } else  if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["s"] && map["a"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowUp"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["ArrowRight"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["ArrowDown"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["ArrowLeft"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["w"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["d"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["s"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["a"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true; complete.style.display = "block";}
          }
    } else if (map["r"]) {
        current = newMaze.grid[0][0];
        newMaze.draw();
        current.highlight(newMaze.columns);
    }



  /*if (!generationComplete) return;
  let key = e.key;
  let row = current.rowNum;
  let col = current.colNum;
  if (current.goal) return;

  switch (key) {
    case "ArrowUp":
      if (!current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "ArrowRight":
      if (!current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "ArrowDown":
      if (!current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "ArrowLeft":
      if (!current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;
	  
	 case "w":
      if (!current.walls.topWall) {
        let next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "d":
      if (!current.walls.rightWall) {
        let next = newMaze.grid[row][col + 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "s":
      if (!current.walls.bottomWall) {
        let next = newMaze.grid[row + 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;

    case "a":
      if (!current.walls.leftWall) {
        let next = newMaze.grid[row][col - 1];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        // not required if goal is in bottom right
        if (current.goal) {completedGame = true; complete.style.display = "block";}
      }
      break;
	  
  }
  */
}

document.addEventListener("keydown", move);
document.addEventListener("keyup", move2);
