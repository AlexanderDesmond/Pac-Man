// Types of Tiles
const TYPES = ["BARRIER", "BISCUIT", "OPEN", "CHERRY", "GHOST", "PACMAN"];

const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

// Class for Tile
class Tile {
  constructor(x, y, type, behaviour) {
    this.x = x;
    this.y = y;

    this.type = type;
    this.moving = false;
    this.exists = true;
    this.destination = (-1, -1);
    this.speed = 0.15;

    this.behaviour = behaviour;
    this.cherryEaten = false;
  }

  draw() {
    switch (this.type) {
      case "BARRIER":
        stroke(0);
        strokeWeight(5);
        fill("#0000FF");
        rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
        break;

      case "BISCUIT":
        noStroke();
        fill(255);
        ellipse(
          this.x * SIZE + THIRD_SIZE,
          this.y * SIZE + THIRD_SIZE,
          THIRD_SIZE,
          THIRD_SIZE
        );
        ellipseMode(CORNER);
        break;

      case "CHERRY":
        noStroke();
        fill("#FF0000");
        ellipse(
          this.x * SIZE + QUARTER_SIZE,
          this.y * SIZE + QUARTER_SIZE,
          HALF_SIZE,
          HALF_SIZE
        );
        ellipseMode(CORNER);
        break;

      case "GHOST":
        stroke(0);
        strokeWeight(1);
        pacman.cherryEaten === true
          ? fill("blue")
          : this.behaviour === 0
          ? fill("purple")
          : this.behaviour === 1
          ? fill("pink")
          : fill("black");
        beginShape();
        vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
        vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE * 3);
        vertex(
          this.x * SIZE + QUARTER_SIZE * 3,
          this.y * SIZE + QUARTER_SIZE * 3
        );
        endShape(CLOSE);
        break;

      case "PACMAN":
        stroke("#FFFF00");
        strokeWeight(5);
        fill("#FFFF33");
        ellipse(
          this.x * SIZE + QUARTER_SIZE,
          this.y * SIZE + QUARTER_SIZE,
          HALF_SIZE,
          HALF_SIZE
        );
        ellipseMode(CORNER);
        break;
    }
  }

  update() {
    // If this tile does not exist, there is nothing to do.
    if (!this.exists) return;

    /* Handle Movement */
    if (this.moving) {
      // Linear interpolation between current location and destination vectors.
      this.x = lerp(this.x, this.destination.x, this.speed);
      this.y = lerp(this.y, this.destination.y, this.speed);

      // Calculate the distance.
      let distanceX = Math.abs(this.x - this.destination.x);
      let distanceY = Math.abs(this.y - this.destination.y);

      // Check if the distance has been covered.
      if (distanceX < 0.1 && distanceY < 0.1) {
        this.x = this.destination.x;
        this.y = this.destination.y;

        // Destination reached, no longer moving.
        this.moving = false;
      }
    }

    /* Handle eating */
    // Only Pac-Man can eat biscuits and cherries.
    if (this.type === "PACMAN") {
      // Pac-Man's destination tile
      let destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

      // Ensure the destination tile exists.
      if (destinationTile.exists) {
        // When Pac-Man eats a biscuit or cherry, increase the score and have the food be 'eaten'.
        switch (destinationTile.type) {
          case "BISCUIT":
            score++;
            destinationTile.exists = false;
            break;

          case "CHERRY":
            score += 10;
            destinationTile.exists = false;
            pacman.cherryEaten = true;
            window.setTimeout(() => (pacman.cherryEaten = false), 10000);
            break;

          case "GHOST":
            // If the Ghosts are not scared but Pac-Man tries to eat a Ghost - Game Over
            if (!pacman.cherryEaten) endGame(false);
            break;
        }
      }

      // Check if game has been won.
      if (score === finalScore) {
        endGame(true);
      }
    } else if (this.type === "GHOST") {
      /* Ghost AI */

      // If a Ghost is not scared and catches Pac-Man the game is lost.
      let distance = dist(pacman.x, pacman.y, this.x, this.y);
      if (distance < 0.3 && !pacman.cherryEaten) {
        endGame(false);
      }

      // If already moving, it cannot move again until next update.
      if (this.moving) return false;

      // List of possible moves.
      // UP, DOWN. LEFT, RIGHT
      let possibleMoves = [
        getTile(this.x, this.y - 1),
        getTile(this.x, this.y + 1),
        getTile(this.x - 1, this.y),
        getTile(this.x + 1, this.y),
      ];

      // Sort possibleMoves in order of most optimal moves (moves closest to Pac-Man).
      possibleMoves.sort((a, b) => {
        let aDist = dist(a.x, a.y, pacman.x, pacman.y);
        let bDist = dist(b.x, b.y, pacman.x, pacman.y);

        return aDist - bDist;
      });

      // Make move
      if (!pacman.cherryEaten) {
        if (this.behaviour === 0) {
          // If Ghost is 'aggressive', move towards Pac-Man.
          for (let i = 0; i < possibleMoves.length; i++) {
            // Attempt to move towards Pac-Man.
            if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) break;
          }
        } else {
          // Otherwise, take any possible move.
          let i = Math.floor(random(4));
          this.move(possibleMoves[i].x, possibleMoves[i].y, false);
        }
      } else {
        // If Pac-Man recently ate a cherry, the Ghosts are scared and run away.
        let movesReversed = possibleMoves.slice().reverse();

        for (let i = 0; i < movesReversed.length; i++) {
          // Attempt to move away Pac-Man.
          if (this.move(movesReversed[i].x, movesReversed[i].y, false)) break;
        }
      }
    }
  }

  move(x, y, relative) {
    // x and y coordinates of destination tile.
    let destinationX, destinationY;

    // Pac-Man direction is relative, Ghost direction is not.
    if (relative) {
      destinationX = this.x + x;
      destinationY = this.y + y;
    } else {
      destinationX = x;
      destinationY = y;
    }

    // If already moving, it cannot move again until next update.
    if (this.moving) return false;

    // Get the destination tile.
    let destinationTile = getTile(destinationX, destinationY);
    let type = destinationTile.type;

    // Prevents Pac-Man and Ghosts from colliding into barriers and Ghosts colliding into each other.
    if (
      (type === "BARRIER" && this.type !== "BARRIER") ||
      (type === "GHOST" && this.type === "GHOST")
    ) {
      return false;
    }

    // Begin movement next update.
    this.moving = true;
    this.destination = createVector(destinationX, destinationY);

    return true;
  }
}

// Get a specific tile from its x and y coordinates.
function getTile(x, y) {
  return field[y * DIMENSIONS + x];
}
