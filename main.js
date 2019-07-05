let canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');
let intervalId = setInterval(function(){
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 100);


let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width/blockSize;
let heightInBlocks = height/blockSize;
let score = 0;

let drawBorder = function () {
  ctx.fillStyle = 'Gray';
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};
drawBorder();

let drawScore = function () {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, blockSize, blockSize);
};
drawScore();
//clear the interval and deisplay game over text
let gameOver = function () {
  clearInterval(intervalId); //stop the game
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", width / 2, height / 2);
};
gameOver();
//draw a circle
let circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x,y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
//the block constructor
let Block = function (col, row) {
  this.col = col;
  this.row = row;
}
Block();
//create a block in column 3, row 4 and draw it

//adding 2 methods
Block.prototype.drawSquare = function (color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
  let centerX = this.col * blockSize + blockSize /2;
  let centerY = this.row * blockSize + blockSize /2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};
//create a circle in column4, row 3
let sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen")

let sampleBlock = new Block(3, 4);
sampleBlock.drawSquare("LightBlue")

Block.prototype.equal = function (BotherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
}
let Snake = function () {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right";
}
  Snake.prototype.draw = function (){
    for (let i = 0; i < this.segments.length; i++){
      this.segments[i].drawSquare("Pink")
    }
  }
  let snake = new Snake();
  snake.draw();