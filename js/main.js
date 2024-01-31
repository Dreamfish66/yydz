
var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 500;

var groundHeight = 350;

var speed_ground = 2;

const bgImage = new Image();
bgImage.src = 'images/background.jpg';


const bg = {
    x1: 0, 
    x2: 6400, 
    y: 0, 
    width: 6400, 
    height: 500, 
    speed: 2 
}
function updateBackground() {
    bg.x1 -= bg.speed;
    bg.x2 -= bg.speed;


    if (bg.x1 < -bg.width) {
        bg.x1 = bg.width-5;
    }
    if (bg.x2 < -bg.width) {
        bg.x2 = bg.width-5;
    }
}

function drawBackground() {
    ctx.drawImage(bgImage, bg.x1, bg.y, bg.width, bg.height);
    ctx.drawImage(bgImage, bg.x2, bg.y, bg.width, bg.height);
}
var groundLine = {
  x: 0,
  y: groundHeight,
  width: canvas.width,
  height: 5
};

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateBackground();
  drawBackground();

  requestAnimationFrame(gameLoop);
}


var p_sound= document.getElementById('zsxb');
document.body.onkeydown = function(e){
    if(e.keyCode == 80){
        p_sound.play();
    }
}

gameLoop();
