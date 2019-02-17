const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 60; // buffer added to visually center
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.lateral = 101;
    this.rightBoundary = this.lateral * 5;
    this.leftBoundary = -this.lateral;
};

Enemy.prototype.update = function(dt) {
    // move enemy across board
    if(this.x < this.rightBoundary) {
      this.x += this.speed * dt;
    }
    // return enemy to start position
    else {
      this.x = this.leftBoundary;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor() {
    this.lateral = 101; // x axis movement increment
    this.vertical = 83; // y axis movement increment
    this.sprite = 'images/char-horn-girl.png';
    this.startX = this.lateral * 2; // center on x axis
    this.startY = (this.vertical * 4) + 60; // bottom of y axis, plus buffer to visually center
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }
  update() {
    // check for collisions
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.lateral/2 > this.x && enemy.x < this.x + this.lateral/2) ) {
        this.reset();
      }
    }
    // check for win
    if (this.y < 60) {
      this.victory = true;
    }
  }
  // load player image
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // manage movement
  handleInput(input) {
    switch(input) {
      case "up":
        if (this.y > 0) {
          this.y -= this.vertical;
        }
        break;
      case "down":
        if (this.y < this.vertical * 4) {
          this.y += this.vertical;
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.lateral;
        }
        break;
      case "right":
        if (this.x < this.lateral * 4) {
          this.x += this.lateral;
        }
        break;
    }
  }
  // return player to starting position
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
};

// instantiate objects
const player = new Player();
const enemy1 = new Enemy(-101, 0, 250);
const enemy2 = new Enemy(-101, 83, 200);
const enemy3 = new Enemy(-101, 166, 150);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
