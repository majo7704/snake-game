//canvas set up

$(document).ready(function () {


let canvas = document.getElementById("canvas")
let ctx =canvas.getContext('2d');

//my variables
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;



let drawBorder = function (){
  ctx.fillStyle = 'Gray'
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height)
};
  let drawScore = function () {
    ctx.font = " 20px Bahiani";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseLine = "top";
    ctx.fillText("Score: " + score, 50, 30)
  };


  let gameOver = function () {
    clearInterval(intervalId);
    ctx.font = "6vh Bahiani";
    ctx.fillStyle = "Black";
    ctx.textAlign = 'center'; 
    ctx.textBaseLine = "middle";
    let imgGameOver = new Image(10, 10);
    imgGameOver.src = '../javascript/img/THE-END.png';
    imgGameOver.onload = function(){
    ctx.drawImage(imgGameOver, 70, 50);
    }
    let audio = new Audio('../javascript/audio/382310__myfox14__game-over-arcade.wav');
    audio.play();
  };
 

let circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false)
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
//Block constructor
let Block = function (col, row) {
  this.col = col;
  this.row = row;
}

Block.prototype.drawSquare = function(color) {
  let x = this.col * blockSize ;
  let y = this.row * blockSize ;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function(color) {
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true)
};

//checks if a block is in the same location as other one
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
}

let Snake = function () {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5),
    new Block(4, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right"
}
Snake.prototype.draw = function () {
  for (let i = 0; i < this.segments.length; i++){
    this.segments[i].drawSquare("Orange")
  }
}
let Snake2 = function () {
  this.segments = [
      new Block(10, 2),
      new Block(11, 2),
      new Block(12, 3),
      new Block(13, 2)
  ]
  this.direction = "right";
  this.nextDirection = "right"
}

Snake.prototype.move = function (){
  var head = this.segments[0];
  var newHead;

  this.direction = this.nextDirection;

  if (this.direction === 'right') {
    newHead = new Block(head.col +1, head.row);
  } else if (this.direction === 'down') {
    newHead = new Block(head.col, head.row +1);
  } else if (this.direction === 'left') {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === 'up') {
    newHead = new Block(head.col, head.row - 1);
  } else if (this.direction === 'stop') {
    newHead = new Block(head.col, head.row);
  } 

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }
  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    let audio = new Audio('../javascript/audio/20280__koops__apple-crunch-17.wav');
    audio.play();
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};

Snake.prototype.checkCollision = function (head) {
  let leftCollision = (head.col === 0);
  let topCollision = (head.row === 0);
  let rightCollision = (head.col === widthInBlocks -1);
  let bottomCollision = (head.row === heightInBlocks - 1);

  let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

  let selfCollision = false;
  for (let i = 0; i < this.segments.length; i ++){
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision || selfCollision;
};
Snake.prototype.setDirection = function(newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }
  this.nextDirection = newDirection;
};
let Apple = function () {
  this.position = new Block(10, 10);
};

Apple.prototype.draw = function () {
  this.position.drawCircle('Red')
};

Apple.prototype.move = function () {
  let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);
  if (this.position === this.segments) {
    new Block(randomCol, randomRow)
  }
};

var snake = new Snake();
var snake2 = new Snake2();
var apple = new Apple();


let intervalId = setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 100);

let pauseGame = function() {
  clearInterval(intervalId);
  score;
}
  let startTheGame = function () {
      this.snake.move();
  }

let directions = {
  13: "enter",//go
  32: "pause",// space,
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

$('body').keydown(function(event){
  let newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
  switch (event.keyCode) {
    case 32: 
      pauseGame();
      break;
    case 18:
      startTheGame(snake);
      break;
      default:
        console.log("press the key")
  }
})
});