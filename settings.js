let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#number");
let complete = document.querySelector(".complete");
let lost = document.querySelector(".lost");
let replayWin = document.querySelector(".replay");
let closeWin = document.querySelector(".close");
let replayLoss = document.querySelector(".replay2");
let explore = document.querySelector(".explore");
let freeplay = document.querySelector(".freeplay");
let returnToHome = document.querySelector(".return");
let viewSolution = document.querySelector(".viewSolution");
let textTimer = document.getElementsByClassName("timer");
let textScore = document.getElementsByClassName("score");
let textLevel = document.getElementsByClassName("level");
let title = document.getElementsByClassName("title");


let newMaze;
let completedGame = false;
let lostGame = false;
let freeMove = false;
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
  clearInterval(time);
  generateMaze(new SubmitEvent("submit"));
});

closeWin.addEventListener("click", () => {
  complete.style.display = "none";
});

replayLoss.addEventListener("click", () => {
    location.reload();
  });

returnToHome.addEventListener("click", () => {
    location.reload();
  });

explore.addEventListener("click", () => {
    lost.style.display = "none";
    freeplay.style.display = "block";
    freeMove = true;
    map = {};
  });
  
  viewSolution.addEventListener("click", () => {
    async function handleViewSolution(){
        let sol = newMaze.solution();
        // Returns a Promise that resolves after "ms" Milliseconds
        const timer = ms => new Promise(res => setTimeout(res, ms));
        async function paintSolutionTile (tile,next) { // We need to wrap the loop into an async function for this to work
            await timer(150) 
            tile.highlightSolution(next,newMaze.columns);
              ; // then the created Promise can be awaited
            }
        let i = 0;
        while( i < sol.length) {
            await paintSolutionTile(sol[i],sol[i+1]);
            i++;
        }
      }
      handleViewSolution();

  });





  function myTimer() {
    document.getElementById('timer').innerHTML = "Timer: " + sec;
    sec--;
    if (sec < 0) {
        lostGame = true;
        lost.style.display = "block";
        clearInterval(time);
    } else if (completedGame) {
      clearInterval(time);
    }
}

function generateMaze(e) {
  e.preventDefault();
  
  let mazeSize = Math.ceil(window.innerHeight*0.8) % 2 == 0 ? Math.ceil(window.innerHeight*0.8): Math.floor(window.innerHeight*0.8);
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
  title[0].style.top = '-2%';
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
    if (current.goal && !freeMove) return;
    if (lostGame && !freeMove) return;
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
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true;  score += sec; complete.style.display = "block";}
              }
          } else if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true;  score += sec; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowUp"] && map["ArrowLeft"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowDown"] && map["ArrowRight"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
          } else  if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowDown"] && map["ArrowLeft"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["w"] && map["d"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["w"] && map["a"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.topWall) {
                let next = newMaze.grid[--row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["s"] && map["d"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][++col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
          } else  if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["s"] && map["a"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][--col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                // not required if goal is in bottom right
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
              }
          } else if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[++row][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal && !lostGame) {completedGame = true; complete.style.display = "block";}
            }
        }
    } else if (map["ArrowUp"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowRight"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowDown"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["ArrowLeft"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["w"]) {
        if (!current.walls.topWall) {
            let next = newMaze.grid[--row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["d"]) {
        if (!current.walls.rightWall) {
            let next = newMaze.grid[row][++col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["s"]) {
        if (!current.walls.bottomWall) {
            let next = newMaze.grid[++row][col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["a"]) {
        if (!current.walls.leftWall) {
            let next = newMaze.grid[row][--col];
            current = next;
            newMaze.draw();
            current.highlight(newMaze.columns);
            // not required if goal is in bottom right
            if (current.goal && !lostGame) {completedGame = true;  score += sec*(Math.pow(10,gameNum)); complete.style.display = "block"; return}
          }
    } else if (map["r"]) {
        current = newMaze.grid[0][0];
        newMaze.draw();
        current.highlight(newMaze.columns);
    }
}

document.addEventListener("keydown", move);
document.addEventListener("keyup", move2);