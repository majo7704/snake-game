//canvas set up
let canvas = document.getElementById("canvas")
let ctx =canvas.getContext('2d');


let intervalId = setInterval(function(){
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  redApple.draw();
  drawBorder();

}, 100);
//my variables
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;

let drawBorder = function (){
  ctx.fillStyle = 'Gray'
  ctx.fillRect(0, 0, width, blockSize/2);
  ctx.fillRect(0, height-blockSize/2, width, blockSize);
  ctx.fillRect(0, 0, blockSize/2, height);
  ctx.fillRect(width-blockSize/2, 0, blockSize, height)
};
drawBorder();

let drwaScore = function () {
  ctx.font = "4vh Bahianita";
  ctx.fillStyle = "Black";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "black";
  ctx.textAlign = "left";
  ctx.textBaseLine ="top";
  ctx.fillText("Score: " + score, blockSize + 10, blockSize + 10) 
};
drwaScore();
//clear the interval
let gameOver = function () {
  clearInterval(intervalId);
  ctx.font = "6vh Bahianita";
  ctx.fillStyle = "Black";
  ctx.textAlign = 'center';
  ctx.textBaseLine = "middle";
  ctx.fillText("Game Over", width/2, height/2)
};
gameOver();

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
  return this.col === otherBlock.col && this.row === otherBlock.row
}

let Snake = function () {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right"
}
Snake.prototype.draw = function () {
  for (let i = 0; i < this.segments.length; i++){
    ctx.fillStyle = (i ==0) ? "green" : "white";
    ctx.fillRect(this.segments[i].x, this.segments[i].y, blockSize, blockSize)
    ctx.strokeStyle ="red"
    ctx.strokeRect(this.segments[i].x,this.segments[i].y, blockSize, blockSize)
    this.segments[i].drawSquare("Orange")
  }
}
let mainSnake = new Snake();
mainSnake.draw();

Snake.prototype.move = function (){
  let head = this.segments[0];
  let newHead;

  this.direction = this.newDirection;

  if (this.direction === 'right') {
    newHead = new Block(head.col +1, head.row);
  } else if (this.direction === 'down') {
    newHead = new Block(head.col, head.row +1);
  } else if (this.direction === 'left') {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === 'up') {
    newHead = new Block()
  }
}
//document.onkeydown = function (e) {
  //if (e.keyCode == 32) {
  //  ball.userPull = 0.3;
  //}
//}

//document.onkeyup = function (e) {
  //if (e.keyCode == 32) {
   // ball.userPull = 0;
  //}
//};
