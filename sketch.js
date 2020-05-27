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
let field = [];

let pacX, pacY;

function setup() {
  // Create canvas/
  createCanvas(500, 500);

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
    field[i].draw();
  }
}

function generateField() {
  let f = [];

  for (let i = 0; i < FIELD_MAP.length; i++) {
    let row = FIELD_MAP[i].split(",");

    for (let j = 0; j < row.length; j++) {
      let type = TYPES[row[j]];
      let tile = new Tile(j, i, type, -1);
      f.push(tile);
    }
  }

  return f;
}

function handleMovement() {
  if (keyIsDown(UP_ARROW)) {
  } else if (keyIsDown(DOWN_ARROW)) {
  } else if (keyIsDown(LEFT_ARROW)) {
  } else if (keyIsDown(RIGHT_ARROW)) {
  }
}
