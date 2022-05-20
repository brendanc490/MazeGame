let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#number");
let complete = document.querySelector(".complete");
let lost = document.querySelector(".lost");
let replayWin = document.querySelector(".replay");
let closeWin = document.querySelector(".close");
let replayLoss = document.querySelector(".replay2");
let viewSolution = document.querySelector(".viewSolution");
let textTimer = document.getElementsByClassName("timer");
let textScore = document.getElementsByClassName("score");
let textLevel = document.getElementsByClassName("level");

let newMaze;
let completedGame = false;
let lostGame = false;
let gameNum = 1;
let number = Math.ceil(0.297619*(gameNum*gameNum)+1.94048*(gameNum)+2.285710);
let sec = number*2;
var time = null;
var score = 0;

form.addEventListener("submit", generateMaze);

replayWin.addEventListener("click", () => {
  gameNum += 1;
  completedGame = false;
  lostGame = false;
  complete.style.display = "none";
  map = {};
  generateMaze(new SubmitEvent("submit"));
});

closeWin.addEventListener("click", () => {
  complete.style.display = "none";
});

replayLoss.addEventListener("click", () => {
    location.reload();
  });
  
  viewSolution.addEventListener("click", () => {
    lost.style.display = "none";
    newMaze.solution();
  });

  function myTimer() {
    document.getElementById('timer').innerHTML = "Timer: " + sec;
    sec--;
    if (sec < 0) {
        lostGame = true;
        lost.style.display = "block";
        clearInterval(time);
    } else if (completedGame) {
        console.log("test");
      clearInterval(time);
    }
}

function generateMaze(e) {
  e.preventDefault();
  let mazeSize = 800;
  let number = Math.ceil(0.297619*(gameNum*gameNum)+1.94048*(gameNum)+2.285710);
  form.style.display = "none";
  newMaze = new Maze(mazeSize, number, number);
  newMaze.setup();
  current = newMaze.grid[Math.floor(Math.random() * newMaze.columns)][Math.floor(Math.random() * newMaze.columns)]
  newMaze.createMaze();
  document.getElementById('timer').innerHTML = "Timer: " + number*2;
  document.getElementById('level').innerHTML = "Level " + gameNum;
  document.getElementById('score').innerHTML = "Score: " + score;
  newMaze.draw();
  newMaze.grid[0][0].highlight(newMaze.columns);
  current = newMaze.grid[0][0];
  textTimer[0].style.display = "block";
  textLevel[0].style.display = "block";
  textScore[0].style.display = "block";
  sec = number*2;
  time = setInterval(myTimer, 1000);
  if (lostGame) {
      clearInterval(time);
  }
}

var map = {};

move = move2 = async function(e) {
    if (!generationComplete) return;
    if (current.goal) return;
    if (lostGame) return;
    let row = current.rowNum;
    let col = current.colNum;
    map[e.key] = e.type == "keydown";
    if (map["ArrowUp"] && map["ArrowRight"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) {completedGame = true;  score += sec; complete.style.display = "block";}
              }
          } else if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal) {completedGame = true;  score += sec; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowUp"] && map["ArrowLeft"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowRight"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowDown"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowLeft"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["w"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["d"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["s"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["a"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
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
