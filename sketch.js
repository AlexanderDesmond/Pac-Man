const SIZE = 25;
const DIMENSIONS = 20;

const field = [];

function setup() {
  // Create canvas/
  createCanvas(500, 500);

  for (let i = 0; i < 400; i++) {
    field.push(new Tile(i % 20, Math.floor(i / 20), "BARRIER"));
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
