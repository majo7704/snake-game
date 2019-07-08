let canvas = document.getElementById("canvas")
let ctx =canvas.getContext('2d');

let intervalId = setInterval(function(){
  ctx.clearRect(0, 0, width, height);
  drwaScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 100);

let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;

