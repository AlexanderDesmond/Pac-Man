const SIZE = 25;
const DIMENSIONS = 20;

const FIELD_MAP = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];
let field = [],
  pacman,
  ghosts = [],
  score = 0,
  finalScore;

function setup() {
  // Create canvas/
  createCanvas(500, 540);

  field = generateField();
}

function draw() {
  // Draw background.
  background(51);

  // Draw tiles
  for (let i = 0; i < field.length; i++) {
    if (
      field[i].exists &&
      field[i].type !== "PACMAN" &&
      field[i].type !== "GHOST"
    ) {
      field[i].draw();
    }
  }

  // Draw Pac-Man
  pacman.update();
  pacman.draw();

  // Draw ghosts
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].update();
    ghosts[i].draw();
  }

  // Draw score
  noStroke();
  fill(255);
  text(score, 30, height - 10);
  textAlign(CENTER);
  textSize(30);

  // Move Pac-Man
  handleMovement();
}

function generateField() {
  let f = [];

  for (let i = 0; i < FIELD_MAP.length; i++) {
    let row = FIELD_MAP[i].split(",");

    for (let j = 0; j < row.length; j++) {
      let type = TYPES[row[j]];
      let tile = new Tile(j, i, type, -1);

      switch (type) {
        case "PACMAN":
          pacman = tile;
          f.push(new Tile(j, i, "OPEN"));
          break;
        case "GHOST":
          ghosts.push(new Tile(j, i, type));
          f.push(new Tile(j, i, "OPEN"));
          break;
        case "BISCUIT":
          finalScore++;
          f.push(tile);
          break;
        case "CHERRY":
          finalScore += 10;
          f.push(tile);
          break;
        case "BARRIER":
          f.push(tile);
          break;
      }
    }
  }

  return f;
}

// Handle Pac-Man's movement.
function handleMovement() {
  if (keyIsDown(UP_ARROW)) {
    pacman.move(0, -1, true);
  } else if (keyIsDown(DOWN_ARROW)) {
    pacman.move(0, 1, true);
  } else if (keyIsDown(LEFT_ARROW)) {
    pacman.move(-1, 0, true);
  } else if (keyIsDown(RIGHT_ARROW)) {
    pacman.move(1, 0, true);
  }
}

function endGame(gameWon) {
  stroke(0);
  strokeWeight(5);
  fill(255);
  textAlign(CENTER);
  textSize(75);

  // Display end game text
  if (gameWon) {
    text("YOU WIN!", width / 2, height / 2);
  } else {
    text("GAME OVER!", width / 2, height / 2);
  }

  // Instructions to start a new game.
  textSize(35);
  text("Pres SPACE to restart.", width / 2, height / 2 + 50);

  noLoop();
}
