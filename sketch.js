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
  score = 0;

function setup() {
  // Create canvas/
  createCanvas(500, 540);

  field = generateField();

  for (let i = 0; i < 400; i++) {
    // Testing
    /*
    field.push(new Tile(i % 20, Math.floor(i / 20), "BARRIER"));
    field.push(new Tile(i % 20, Math.floor(i / 20), "BISCUIT"));
    field.push(new Tile(i % 20, Math.floor(i / 20), "CHERRY"));
    */
    //field.push(new Tile(i % 20, Math.floor(i / 20), random(TYPES)));
  }
}

function draw() {
  // Draw background.
  background(51);

  // Draw tiles
  for (let i = 0; i < field.length; i++) {
    field[i].update();
    field[i].draw();
  }

  // Draw score
  noStroke();
  fill(255);
  text(score, 5, height - 10);
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

      if (type === "PACMAN") {
        pacman = tile;
      }

      f.push(tile);
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
