let canvas = document.getElementById("canvas")
let ctx =canvas.getContext('2d');

let intervalId = setInterval(function(){
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  redApple.draw();
}, 100);

let width = canvas.width;
let height = canvas.height;
let blockSize = 15;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;

let drawBorder = function (){
  ctx.fillStyle = 'yellowgreen'
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height-blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width-blockSize, 0, blockSize, height)
};
drawBorder();

let drwaScore = function () {
  ctx.font = "3vh Bahianita";
  ctx.fillStyle = "Black";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "black";
  ctx.textAlign = "left";
  ctx.textBaseLine ="top";
  ctx.fillText("Score: " + score, blockSize + 10, blockSize + 10) 
};
drwaScore();

let gameOver = function () {
  clearInterval(intervalId);
  ctx.font = "5vh Bahianita";
  ctx.fillStyle = "Black";
  ctx.textAlign = 'center';
  ctx.textBaseLine = "middle";
  ctx.fillText("Game Over", width/2, height/2)
};
gameOver();

let redApple = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false)
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
let Block = function (col, row) {
  this.col = col;
  this.row = row;
}
Block();